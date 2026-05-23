import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

export interface JwtPayload {
  sub: number;
  name: string;
  role: 'barista';
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(pin: string) {
    // Find any active barista whose pinHash matches the PIN.
    // For single-barista setup, this iterates over very few rows.
    const baristas = await this.prisma.barista.findMany({
      where: { isActive: true },
    });

    let match: (typeof baristas)[number] | null = null;
    for (const b of baristas) {
      if (await bcrypt.compare(pin, b.pinHash)) {
        match = b;
        break;
      }
    }

    if (!match) {
      throw new UnauthorizedException('PIN incorrecto');
    }

    const payload: JwtPayload = {
      sub: match.id,
      name: match.name,
      role: 'barista',
    };

    return {
      access_token: await this.jwt.signAsync(payload),
      barista: { id: match.id, name: match.name },
    };
  }

  async validateBarista(id: number) {
    return this.prisma.barista.findUnique({
      where: { id, isActive: true },
    });
  }
}
