/**
 * Client
 **/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Category
 *
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>;
/**
 * Model Table
 *
 */
export type Table = $Result.DefaultSelection<Prisma.$TablePayload>;
/**
 * Model Ingredient
 *
 */
export type Ingredient = $Result.DefaultSelection<Prisma.$IngredientPayload>;
/**
 * Model Product
 *
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>;
/**
 * Model Order
 *
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>;
/**
 * Model ProductIngredient
 *
 */
export type ProductIngredient =
  $Result.DefaultSelection<Prisma.$ProductIngredientPayload>;
/**
 * Model OrderItem
 *
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>;
/**
 * Model N8nChatHistory
 *
 */
export type N8nChatHistory =
  $Result.DefaultSelection<Prisma.$N8nChatHistoryPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const TableStatus: {
    Available: 'Available';
    Occupied: 'Occupied';
    Reserved: 'Reserved';
  };

  export type TableStatus = (typeof TableStatus)[keyof typeof TableStatus];

  export const PaymentStatus: {
    PENDING: 'PENDING';
    PAID: 'PAID';
    CANCELLED: 'CANCELLED';
  };

  export type PaymentStatus =
    (typeof PaymentStatus)[keyof typeof PaymentStatus];

  export const KitchenStatus: {
    WAITING: 'WAITING';
    PREPARING: 'PREPARING';
    READY: 'READY';
    DELIVERED: 'DELIVERED';
  };

  export type KitchenStatus =
    (typeof KitchenStatus)[keyof typeof KitchenStatus];
}

export type TableStatus = $Enums.TableStatus;

export const TableStatus: typeof $Enums.TableStatus;

export type PaymentStatus = $Enums.PaymentStatus;

export const PaymentStatus: typeof $Enums.PaymentStatus;

export type KitchenStatus = $Enums.KitchenStatus;

export const KitchenStatus: typeof $Enums.KitchenStatus;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Categories
 * const categories = await prisma.category.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Categories
   * const categories = await prisma.category.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Categories
   * const categories = await prisma.category.findMany()
   * ```
   */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.table`: Exposes CRUD operations for the **Table** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Tables
   * const tables = await prisma.table.findMany()
   * ```
   */
  get table(): Prisma.TableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ingredient`: Exposes CRUD operations for the **Ingredient** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Ingredients
   * const ingredients = await prisma.ingredient.findMany()
   * ```
   */
  get ingredient(): Prisma.IngredientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Products
   * const products = await prisma.product.findMany()
   * ```
   */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Orders
   * const orders = await prisma.order.findMany()
   * ```
   */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productIngredient`: Exposes CRUD operations for the **ProductIngredient** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ProductIngredients
   * const productIngredients = await prisma.productIngredient.findMany()
   * ```
   */
  get productIngredient(): Prisma.ProductIngredientDelegate<
    ExtArgs,
    ClientOptions
  >;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more OrderItems
   * const orderItems = await prisma.orderItem.findMany()
   * ```
   */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.n8nChatHistory`: Exposes CRUD operations for the **N8nChatHistory** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more N8nChatHistories
   * const n8nChatHistories = await prisma.n8nChatHistory.findMany()
   * ```
   */
  get n8nChatHistory(): Prisma.N8nChatHistoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string;
    engine: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import Bytes = runtime.Bytes;
  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends bigint
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    Category: 'Category';
    Table: 'Table';
    Ingredient: 'Ingredient';
    Product: 'Product';
    Order: 'Order';
    ProductIngredient: 'ProductIngredient';
    OrderItem: 'OrderItem';
    N8nChatHistory: 'N8nChatHistory';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | 'category'
        | 'table'
        | 'ingredient'
        | 'product'
        | 'order'
        | 'productIngredient'
        | 'orderItem'
        | 'n8nChatHistory';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>;
        fields: Prisma.CategoryFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[];
          };
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[];
          };
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[];
          };
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateCategory>;
          };
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>;
            result: $Utils.Optional<CategoryGroupByOutputType>[];
          };
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>;
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number;
          };
        };
      };
      Table: {
        payload: Prisma.$TablePayload<ExtArgs>;
        fields: Prisma.TableFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.TableFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.TableFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>;
          };
          findFirst: {
            args: Prisma.TableFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.TableFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>;
          };
          findMany: {
            args: Prisma.TableFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[];
          };
          create: {
            args: Prisma.TableCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>;
          };
          createMany: {
            args: Prisma.TableCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.TableCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[];
          };
          delete: {
            args: Prisma.TableDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>;
          };
          update: {
            args: Prisma.TableUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>;
          };
          deleteMany: {
            args: Prisma.TableDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.TableUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.TableUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[];
          };
          upsert: {
            args: Prisma.TableUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TablePayload>;
          };
          aggregate: {
            args: Prisma.TableAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateTable>;
          };
          groupBy: {
            args: Prisma.TableGroupByArgs<ExtArgs>;
            result: $Utils.Optional<TableGroupByOutputType>[];
          };
          count: {
            args: Prisma.TableCountArgs<ExtArgs>;
            result: $Utils.Optional<TableCountAggregateOutputType> | number;
          };
        };
      };
      Ingredient: {
        payload: Prisma.$IngredientPayload<ExtArgs>;
        fields: Prisma.IngredientFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.IngredientFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.IngredientFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>;
          };
          findFirst: {
            args: Prisma.IngredientFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.IngredientFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>;
          };
          findMany: {
            args: Prisma.IngredientFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>[];
          };
          create: {
            args: Prisma.IngredientCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>;
          };
          createMany: {
            args: Prisma.IngredientCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.IngredientCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>[];
          };
          delete: {
            args: Prisma.IngredientDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>;
          };
          update: {
            args: Prisma.IngredientUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>;
          };
          deleteMany: {
            args: Prisma.IngredientDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.IngredientUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.IngredientUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>[];
          };
          upsert: {
            args: Prisma.IngredientUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientPayload>;
          };
          aggregate: {
            args: Prisma.IngredientAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateIngredient>;
          };
          groupBy: {
            args: Prisma.IngredientGroupByArgs<ExtArgs>;
            result: $Utils.Optional<IngredientGroupByOutputType>[];
          };
          count: {
            args: Prisma.IngredientCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<IngredientCountAggregateOutputType>
              | number;
          };
        };
      };
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>;
        fields: Prisma.ProductFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[];
          };
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[];
          };
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[];
          };
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateProduct>;
          };
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ProductGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>;
            result: $Utils.Optional<ProductCountAggregateOutputType> | number;
          };
        };
      };
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>;
        fields: Prisma.OrderFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[];
          };
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[];
          };
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[];
          };
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateOrder>;
          };
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>;
            result: $Utils.Optional<OrderGroupByOutputType>[];
          };
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>;
            result: $Utils.Optional<OrderCountAggregateOutputType> | number;
          };
        };
      };
      ProductIngredient: {
        payload: Prisma.$ProductIngredientPayload<ExtArgs>;
        fields: Prisma.ProductIngredientFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProductIngredientFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductIngredientPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProductIngredientFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductIngredientPayload>;
          };
          findFirst: {
            args: Prisma.ProductIngredientFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductIngredientPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProductIngredientFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductIngredientPayload>;
          };
          findMany: {
            args: Prisma.ProductIngredientFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductIngredientPayload>[];
          };
          create: {
            args: Prisma.ProductIngredientCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductIngredientPayload>;
          };
          createMany: {
            args: Prisma.ProductIngredientCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ProductIngredientCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductIngredientPayload>[];
          };
          delete: {
            args: Prisma.ProductIngredientDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductIngredientPayload>;
          };
          update: {
            args: Prisma.ProductIngredientUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductIngredientPayload>;
          };
          deleteMany: {
            args: Prisma.ProductIngredientDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ProductIngredientUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ProductIngredientUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductIngredientPayload>[];
          };
          upsert: {
            args: Prisma.ProductIngredientUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductIngredientPayload>;
          };
          aggregate: {
            args: Prisma.ProductIngredientAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateProductIngredient>;
          };
          groupBy: {
            args: Prisma.ProductIngredientGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ProductIngredientGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProductIngredientCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<ProductIngredientCountAggregateOutputType>
              | number;
          };
        };
      };
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>;
        fields: Prisma.OrderItemFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
          };
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
          };
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
          };
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateOrderItem>;
          };
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>;
            result: $Utils.Optional<OrderItemGroupByOutputType>[];
          };
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>;
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number;
          };
        };
      };
      N8nChatHistory: {
        payload: Prisma.$N8nChatHistoryPayload<ExtArgs>;
        fields: Prisma.N8nChatHistoryFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.N8nChatHistoryFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$N8nChatHistoryPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.N8nChatHistoryFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$N8nChatHistoryPayload>;
          };
          findFirst: {
            args: Prisma.N8nChatHistoryFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$N8nChatHistoryPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.N8nChatHistoryFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$N8nChatHistoryPayload>;
          };
          findMany: {
            args: Prisma.N8nChatHistoryFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$N8nChatHistoryPayload>[];
          };
          create: {
            args: Prisma.N8nChatHistoryCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$N8nChatHistoryPayload>;
          };
          createMany: {
            args: Prisma.N8nChatHistoryCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.N8nChatHistoryCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$N8nChatHistoryPayload>[];
          };
          delete: {
            args: Prisma.N8nChatHistoryDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$N8nChatHistoryPayload>;
          };
          update: {
            args: Prisma.N8nChatHistoryUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$N8nChatHistoryPayload>;
          };
          deleteMany: {
            args: Prisma.N8nChatHistoryDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.N8nChatHistoryUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.N8nChatHistoryUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$N8nChatHistoryPayload>[];
          };
          upsert: {
            args: Prisma.N8nChatHistoryUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$N8nChatHistoryPayload>;
          };
          aggregate: {
            args: Prisma.N8nChatHistoryAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateN8nChatHistory>;
          };
          groupBy: {
            args: Prisma.N8nChatHistoryGroupByArgs<ExtArgs>;
            result: $Utils.Optional<N8nChatHistoryGroupByOutputType>[];
          };
          count: {
            args: Prisma.N8nChatHistoryCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<N8nChatHistoryCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory;
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
  }
  export type GlobalOmitConfig = {
    category?: CategoryOmit;
    table?: TableOmit;
    ingredient?: IngredientOmit;
    product?: ProductOmit;
    order?: OrderOmit;
    productIngredient?: ProductIngredientOmit;
    orderItem?: OrderItemOmit;
    n8nChatHistory?: N8nChatHistoryOmit;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number;
  };

  export type CategoryCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs;
  };

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductWhereInput;
  };

  /**
   * Count Type TableCountOutputType
   */

  export type TableCountOutputType = {
    orders: number;
  };

  export type TableCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    orders?: boolean | TableCountOutputTypeCountOrdersArgs;
  };

  // Custom InputTypes
  /**
   * TableCountOutputType without action
   */
  export type TableCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TableCountOutputType
     */
    select?: TableCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * TableCountOutputType without action
   */
  export type TableCountOutputTypeCountOrdersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderWhereInput;
  };

  /**
   * Count Type IngredientCountOutputType
   */

  export type IngredientCountOutputType = {
    productIngredients: number;
  };

  export type IngredientCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    productIngredients?:
      | boolean
      | IngredientCountOutputTypeCountProductIngredientsArgs;
  };

  // Custom InputTypes
  /**
   * IngredientCountOutputType without action
   */
  export type IngredientCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the IngredientCountOutputType
     */
    select?: IngredientCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * IngredientCountOutputType without action
   */
  export type IngredientCountOutputTypeCountProductIngredientsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductIngredientWhereInput;
  };

  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    productIngredients: number;
    orderItems: number;
  };

  export type ProductCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    productIngredients?:
      | boolean
      | ProductCountOutputTypeCountProductIngredientsArgs;
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs;
  };

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountProductIngredientsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductIngredientWhereInput;
  };

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderItemWhereInput;
  };

  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    orderItems: number;
  };

  export type OrderCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    orderItems?: boolean | OrderCountOutputTypeCountOrderItemsArgs;
  };

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountOrderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderItemWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null;
    _avg: CategoryAvgAggregateOutputType | null;
    _sum: CategorySumAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
  };

  export type CategoryAvgAggregateOutputType = {
    id: number | null;
  };

  export type CategorySumAggregateOutputType = {
    id: number | null;
  };

  export type CategoryMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    isActive: boolean | null;
  };

  export type CategoryMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    isActive: boolean | null;
  };

  export type CategoryCountAggregateOutputType = {
    id: number;
    name: number;
    isActive: number;
    _all: number;
  };

  export type CategoryAvgAggregateInputType = {
    id?: true;
  };

  export type CategorySumAggregateInputType = {
    id?: true;
  };

  export type CategoryMinAggregateInputType = {
    id?: true;
    name?: true;
    isActive?: true;
  };

  export type CategoryMaxAggregateInputType = {
    id?: true;
    name?: true;
    isActive?: true;
  };

  export type CategoryCountAggregateInputType = {
    id?: true;
    name?: true;
    isActive?: true;
    _all?: true;
  };

  export type CategoryAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categories to fetch.
     */
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Categories
     **/
    _count?: true | CategoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: CategoryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: CategorySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: CategoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: CategoryMaxAggregateInputType;
  };

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>;
  };

  export type CategoryGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CategoryWhereInput;
    orderBy?:
      | CategoryOrderByWithAggregationInput
      | CategoryOrderByWithAggregationInput[];
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum;
    having?: CategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CategoryCountAggregateInputType | true;
    _avg?: CategoryAvgAggregateInputType;
    _sum?: CategorySumAggregateInputType;
    _min?: CategoryMinAggregateInputType;
    _max?: CategoryMaxAggregateInputType;
  };

  export type CategoryGroupByOutputType = {
    id: number;
    name: string;
    isActive: boolean;
    _count: CategoryCountAggregateOutputType | null;
    _avg: CategoryAvgAggregateOutputType | null;
    _sum: CategorySumAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
  };

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<CategoryGroupByOutputType, T['by']> & {
          [P in keyof T & keyof CategoryGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>;
        }
      >
    >;

  export type CategorySelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      isActive?: boolean;
      products?: boolean | Category$productsArgs<ExtArgs>;
      _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['category']
  >;

  export type CategorySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      isActive?: boolean;
    },
    ExtArgs['result']['category']
  >;

  export type CategorySelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      isActive?: boolean;
    },
    ExtArgs['result']['category']
  >;

  export type CategorySelectScalar = {
    id?: boolean;
    name?: boolean;
    isActive?: boolean;
  };

  export type CategoryOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'name' | 'isActive',
    ExtArgs['result']['category']
  >;
  export type CategoryInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    products?: boolean | Category$productsArgs<ExtArgs>;
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type CategoryIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type CategoryIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $CategoryPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Category';
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        name: string;
        isActive: boolean;
      },
      ExtArgs['result']['category']
    >;
    composites: {};
  };

  type CategoryGetPayload<
    S extends boolean | null | undefined | CategoryDefaultArgs,
  > = $Result.GetResult<Prisma.$CategoryPayload, S>;

  type CategoryCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CategoryCountAggregateInputType | true;
  };

  export interface CategoryDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Category'];
      meta: { name: 'Category' };
    };
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(
      args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(
      args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(
      args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     *
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CategoryFindManyArgs>(
      args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     *
     */
    create<T extends CategoryCreateArgs>(
      args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CategoryCreateManyArgs>(
      args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(
      args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     *
     */
    delete<T extends CategoryDeleteArgs>(
      args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CategoryUpdateArgs>(
      args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CategoryDeleteManyArgs>(
      args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CategoryUpdateManyArgs>(
      args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(
      args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(
      args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
     **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends CategoryAggregateArgs>(
      args: Subset<T, CategoryAggregateArgs>,
    ): Prisma.PrismaPromise<GetCategoryAggregateType<T>>;

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetCategoryGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Category model
     */
    readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    products<T extends Category$productsArgs<ExtArgs> = {}>(
      args?: Subset<T, Category$productsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ProductPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<'Category', 'Int'>;
    readonly name: FieldRef<'Category', 'String'>;
    readonly isActive: FieldRef<'Category', 'Boolean'>;
  }

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput;
  };

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput;
  };

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categories to fetch.
     */
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[];
  };

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categories to fetch.
     */
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[];
  };

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categories to fetch.
     */
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[];
  };

  /**
   * Category create
   */
  export type CategoryCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>;
  };

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null;
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Category update
   */
  export type CategoryUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>;
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput;
  };

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Categories.
     */
    data: XOR<
      CategoryUpdateManyMutationInput,
      CategoryUncheckedUpdateManyInput
    >;
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput;
    /**
     * Limit how many Categories to update.
     */
    limit?: number;
  };

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null;
    /**
     * The data used to update Categories.
     */
    data: XOR<
      CategoryUpdateManyMutationInput,
      CategoryUncheckedUpdateManyInput
    >;
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput;
    /**
     * Limit how many Categories to update.
     */
    limit?: number;
  };

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput;
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>;
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>;
  };

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput;
  };

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput;
    /**
     * Limit how many Categories to delete.
     */
    limit?: number;
  };

  /**
   * Category.products
   */
  export type Category$productsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    where?: ProductWhereInput;
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    cursor?: ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
  };

  /**
   * Model Table
   */

  export type AggregateTable = {
    _count: TableCountAggregateOutputType | null;
    _avg: TableAvgAggregateOutputType | null;
    _sum: TableSumAggregateOutputType | null;
    _min: TableMinAggregateOutputType | null;
    _max: TableMaxAggregateOutputType | null;
  };

  export type TableAvgAggregateOutputType = {
    id: number | null;
  };

  export type TableSumAggregateOutputType = {
    id: number | null;
  };

  export type TableMinAggregateOutputType = {
    id: number | null;
    tableName: string | null;
    status: $Enums.TableStatus | null;
  };

  export type TableMaxAggregateOutputType = {
    id: number | null;
    tableName: string | null;
    status: $Enums.TableStatus | null;
  };

  export type TableCountAggregateOutputType = {
    id: number;
    tableName: number;
    status: number;
    _all: number;
  };

  export type TableAvgAggregateInputType = {
    id?: true;
  };

  export type TableSumAggregateInputType = {
    id?: true;
  };

  export type TableMinAggregateInputType = {
    id?: true;
    tableName?: true;
    status?: true;
  };

  export type TableMaxAggregateInputType = {
    id?: true;
    tableName?: true;
    status?: true;
  };

  export type TableCountAggregateInputType = {
    id?: true;
    tableName?: true;
    status?: true;
    _all?: true;
  };

  export type TableAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Table to aggregate.
     */
    where?: TableWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: TableWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tables.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Tables
     **/
    _count?: true | TableCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: TableAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: TableSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: TableMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: TableMaxAggregateInputType;
  };

  export type GetTableAggregateType<T extends TableAggregateArgs> = {
    [P in keyof T & keyof AggregateTable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTable[P]>
      : GetScalarType<T[P], AggregateTable[P]>;
  };

  export type TableGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: TableWhereInput;
    orderBy?:
      | TableOrderByWithAggregationInput
      | TableOrderByWithAggregationInput[];
    by: TableScalarFieldEnum[] | TableScalarFieldEnum;
    having?: TableScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TableCountAggregateInputType | true;
    _avg?: TableAvgAggregateInputType;
    _sum?: TableSumAggregateInputType;
    _min?: TableMinAggregateInputType;
    _max?: TableMaxAggregateInputType;
  };

  export type TableGroupByOutputType = {
    id: number;
    tableName: string;
    status: $Enums.TableStatus;
    _count: TableCountAggregateOutputType | null;
    _avg: TableAvgAggregateOutputType | null;
    _sum: TableSumAggregateOutputType | null;
    _min: TableMinAggregateOutputType | null;
    _max: TableMaxAggregateOutputType | null;
  };

  type GetTableGroupByPayload<T extends TableGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<TableGroupByOutputType, T['by']> & {
          [P in keyof T & keyof TableGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TableGroupByOutputType[P]>
            : GetScalarType<T[P], TableGroupByOutputType[P]>;
        }
      >
    >;

  export type TableSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tableName?: boolean;
      status?: boolean;
      orders?: boolean | Table$ordersArgs<ExtArgs>;
      _count?: boolean | TableCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['table']
  >;

  export type TableSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tableName?: boolean;
      status?: boolean;
    },
    ExtArgs['result']['table']
  >;

  export type TableSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tableName?: boolean;
      status?: boolean;
    },
    ExtArgs['result']['table']
  >;

  export type TableSelectScalar = {
    id?: boolean;
    tableName?: boolean;
    status?: boolean;
  };

  export type TableOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'tableName' | 'status',
    ExtArgs['result']['table']
  >;
  export type TableInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    orders?: boolean | Table$ordersArgs<ExtArgs>;
    _count?: boolean | TableCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type TableIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type TableIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $TablePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Table';
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        tableName: string;
        status: $Enums.TableStatus;
      },
      ExtArgs['result']['table']
    >;
    composites: {};
  };

  type TableGetPayload<
    S extends boolean | null | undefined | TableDefaultArgs,
  > = $Result.GetResult<Prisma.$TablePayload, S>;

  type TableCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<TableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TableCountAggregateInputType | true;
  };

  export interface TableDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Table'];
      meta: { name: 'Table' };
    };
    /**
     * Find zero or one Table that matches the filter.
     * @param {TableFindUniqueArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TableFindUniqueArgs>(
      args: SelectSubset<T, TableFindUniqueArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Table that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TableFindUniqueOrThrowArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TableFindUniqueOrThrowArgs>(
      args: SelectSubset<T, TableFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Table that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindFirstArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TableFindFirstArgs>(
      args?: SelectSubset<T, TableFindFirstArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Table that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindFirstOrThrowArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TableFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TableFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Tables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tables
     * const tables = await prisma.table.findMany()
     *
     * // Get first 10 Tables
     * const tables = await prisma.table.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const tableWithIdOnly = await prisma.table.findMany({ select: { id: true } })
     *
     */
    findMany<T extends TableFindManyArgs>(
      args?: SelectSubset<T, TableFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Table.
     * @param {TableCreateArgs} args - Arguments to create a Table.
     * @example
     * // Create one Table
     * const Table = await prisma.table.create({
     *   data: {
     *     // ... data to create a Table
     *   }
     * })
     *
     */
    create<T extends TableCreateArgs>(
      args: SelectSubset<T, TableCreateArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Tables.
     * @param {TableCreateManyArgs} args - Arguments to create many Tables.
     * @example
     * // Create many Tables
     * const table = await prisma.table.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends TableCreateManyArgs>(
      args?: SelectSubset<T, TableCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Tables and returns the data saved in the database.
     * @param {TableCreateManyAndReturnArgs} args - Arguments to create many Tables.
     * @example
     * // Create many Tables
     * const table = await prisma.table.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Tables and only return the `id`
     * const tableWithIdOnly = await prisma.table.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends TableCreateManyAndReturnArgs>(
      args?: SelectSubset<T, TableCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Table.
     * @param {TableDeleteArgs} args - Arguments to delete one Table.
     * @example
     * // Delete one Table
     * const Table = await prisma.table.delete({
     *   where: {
     *     // ... filter to delete one Table
     *   }
     * })
     *
     */
    delete<T extends TableDeleteArgs>(
      args: SelectSubset<T, TableDeleteArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Table.
     * @param {TableUpdateArgs} args - Arguments to update one Table.
     * @example
     * // Update one Table
     * const table = await prisma.table.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends TableUpdateArgs>(
      args: SelectSubset<T, TableUpdateArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Tables.
     * @param {TableDeleteManyArgs} args - Arguments to filter Tables to delete.
     * @example
     * // Delete a few Tables
     * const { count } = await prisma.table.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends TableDeleteManyArgs>(
      args?: SelectSubset<T, TableDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Tables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tables
     * const table = await prisma.table.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends TableUpdateManyArgs>(
      args: SelectSubset<T, TableUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Tables and returns the data updated in the database.
     * @param {TableUpdateManyAndReturnArgs} args - Arguments to update many Tables.
     * @example
     * // Update many Tables
     * const table = await prisma.table.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Tables and only return the `id`
     * const tableWithIdOnly = await prisma.table.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends TableUpdateManyAndReturnArgs>(
      args: SelectSubset<T, TableUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Table.
     * @param {TableUpsertArgs} args - Arguments to update or create a Table.
     * @example
     * // Update or create a Table
     * const table = await prisma.table.upsert({
     *   create: {
     *     // ... data to create a Table
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Table we want to update
     *   }
     * })
     */
    upsert<T extends TableUpsertArgs>(
      args: SelectSubset<T, TableUpsertArgs<ExtArgs>>,
    ): Prisma__TableClient<
      $Result.GetResult<
        Prisma.$TablePayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Tables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableCountArgs} args - Arguments to filter Tables to count.
     * @example
     * // Count the number of Tables
     * const count = await prisma.table.count({
     *   where: {
     *     // ... the filter for the Tables we want to count
     *   }
     * })
     **/
    count<T extends TableCountArgs>(
      args?: Subset<T, TableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TableCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Table.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends TableAggregateArgs>(
      args: Subset<T, TableAggregateArgs>,
    ): Prisma.PrismaPromise<GetTableAggregateType<T>>;

    /**
     * Group by Table.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends TableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TableGroupByArgs['orderBy'] }
        : { orderBy?: TableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, TableGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetTableGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Table model
     */
    readonly fields: TableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Table.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TableClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    orders<T extends Table$ordersArgs<ExtArgs> = {}>(
      args?: Subset<T, Table$ordersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$OrderPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Table model
   */
  interface TableFieldRefs {
    readonly id: FieldRef<'Table', 'Int'>;
    readonly tableName: FieldRef<'Table', 'String'>;
    readonly status: FieldRef<'Table', 'TableStatus'>;
  }

  // Custom InputTypes
  /**
   * Table findUnique
   */
  export type TableFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * Filter, which Table to fetch.
     */
    where: TableWhereUniqueInput;
  };

  /**
   * Table findUniqueOrThrow
   */
  export type TableFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * Filter, which Table to fetch.
     */
    where: TableWhereUniqueInput;
  };

  /**
   * Table findFirst
   */
  export type TableFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * Filter, which Table to fetch.
     */
    where?: TableWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tables.
     */
    cursor?: TableWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tables.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[];
  };

  /**
   * Table findFirstOrThrow
   */
  export type TableFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * Filter, which Table to fetch.
     */
    where?: TableWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tables.
     */
    cursor?: TableWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tables.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[];
  };

  /**
   * Table findMany
   */
  export type TableFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * Filter, which Tables to fetch.
     */
    where?: TableWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Tables.
     */
    cursor?: TableWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tables.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[];
  };

  /**
   * Table create
   */
  export type TableCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * The data needed to create a Table.
     */
    data: XOR<TableCreateInput, TableUncheckedCreateInput>;
  };

  /**
   * Table createMany
   */
  export type TableCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Tables.
     */
    data: TableCreateManyInput | TableCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Table createManyAndReturn
   */
  export type TableCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * The data used to create many Tables.
     */
    data: TableCreateManyInput | TableCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Table update
   */
  export type TableUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * The data needed to update a Table.
     */
    data: XOR<TableUpdateInput, TableUncheckedUpdateInput>;
    /**
     * Choose, which Table to update.
     */
    where: TableWhereUniqueInput;
  };

  /**
   * Table updateMany
   */
  export type TableUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Tables.
     */
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyInput>;
    /**
     * Filter which Tables to update
     */
    where?: TableWhereInput;
    /**
     * Limit how many Tables to update.
     */
    limit?: number;
  };

  /**
   * Table updateManyAndReturn
   */
  export type TableUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * The data used to update Tables.
     */
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyInput>;
    /**
     * Filter which Tables to update
     */
    where?: TableWhereInput;
    /**
     * Limit how many Tables to update.
     */
    limit?: number;
  };

  /**
   * Table upsert
   */
  export type TableUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * The filter to search for the Table to update in case it exists.
     */
    where: TableWhereUniqueInput;
    /**
     * In case the Table found by the `where` argument doesn't exist, create a new Table with this data.
     */
    create: XOR<TableCreateInput, TableUncheckedCreateInput>;
    /**
     * In case the Table was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TableUpdateInput, TableUncheckedUpdateInput>;
  };

  /**
   * Table delete
   */
  export type TableDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
    /**
     * Filter which Table to delete.
     */
    where: TableWhereUniqueInput;
  };

  /**
   * Table deleteMany
   */
  export type TableDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Tables to delete
     */
    where?: TableWhereInput;
    /**
     * Limit how many Tables to delete.
     */
    limit?: number;
  };

  /**
   * Table.orders
   */
  export type Table$ordersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    where?: OrderWhereInput;
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    cursor?: OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Table without action
   */
  export type TableDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null;
  };

  /**
   * Model Ingredient
   */

  export type AggregateIngredient = {
    _count: IngredientCountAggregateOutputType | null;
    _avg: IngredientAvgAggregateOutputType | null;
    _sum: IngredientSumAggregateOutputType | null;
    _min: IngredientMinAggregateOutputType | null;
    _max: IngredientMaxAggregateOutputType | null;
  };

  export type IngredientAvgAggregateOutputType = {
    id: number | null;
  };

  export type IngredientSumAggregateOutputType = {
    id: number | null;
  };

  export type IngredientMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    isAllergen: boolean | null;
  };

  export type IngredientMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    isAllergen: boolean | null;
  };

  export type IngredientCountAggregateOutputType = {
    id: number;
    name: number;
    isAllergen: number;
    _all: number;
  };

  export type IngredientAvgAggregateInputType = {
    id?: true;
  };

  export type IngredientSumAggregateInputType = {
    id?: true;
  };

  export type IngredientMinAggregateInputType = {
    id?: true;
    name?: true;
    isAllergen?: true;
  };

  export type IngredientMaxAggregateInputType = {
    id?: true;
    name?: true;
    isAllergen?: true;
  };

  export type IngredientCountAggregateInputType = {
    id?: true;
    name?: true;
    isAllergen?: true;
    _all?: true;
  };

  export type IngredientAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Ingredient to aggregate.
     */
    where?: IngredientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ingredients to fetch.
     */
    orderBy?:
      | IngredientOrderByWithRelationInput
      | IngredientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: IngredientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ingredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Ingredients
     **/
    _count?: true | IngredientCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: IngredientAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: IngredientSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: IngredientMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: IngredientMaxAggregateInputType;
  };

  export type GetIngredientAggregateType<T extends IngredientAggregateArgs> = {
    [P in keyof T & keyof AggregateIngredient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIngredient[P]>
      : GetScalarType<T[P], AggregateIngredient[P]>;
  };

  export type IngredientGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: IngredientWhereInput;
    orderBy?:
      | IngredientOrderByWithAggregationInput
      | IngredientOrderByWithAggregationInput[];
    by: IngredientScalarFieldEnum[] | IngredientScalarFieldEnum;
    having?: IngredientScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IngredientCountAggregateInputType | true;
    _avg?: IngredientAvgAggregateInputType;
    _sum?: IngredientSumAggregateInputType;
    _min?: IngredientMinAggregateInputType;
    _max?: IngredientMaxAggregateInputType;
  };

  export type IngredientGroupByOutputType = {
    id: number;
    name: string;
    isAllergen: boolean;
    _count: IngredientCountAggregateOutputType | null;
    _avg: IngredientAvgAggregateOutputType | null;
    _sum: IngredientSumAggregateOutputType | null;
    _min: IngredientMinAggregateOutputType | null;
    _max: IngredientMaxAggregateOutputType | null;
  };

  type GetIngredientGroupByPayload<T extends IngredientGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<IngredientGroupByOutputType, T['by']> & {
          [P in keyof T & keyof IngredientGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IngredientGroupByOutputType[P]>
            : GetScalarType<T[P], IngredientGroupByOutputType[P]>;
        }
      >
    >;

  export type IngredientSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      isAllergen?: boolean;
      productIngredients?: boolean | Ingredient$productIngredientsArgs<ExtArgs>;
      _count?: boolean | IngredientCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['ingredient']
  >;

  export type IngredientSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      isAllergen?: boolean;
    },
    ExtArgs['result']['ingredient']
  >;

  export type IngredientSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      isAllergen?: boolean;
    },
    ExtArgs['result']['ingredient']
  >;

  export type IngredientSelectScalar = {
    id?: boolean;
    name?: boolean;
    isAllergen?: boolean;
  };

  export type IngredientOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'name' | 'isAllergen',
    ExtArgs['result']['ingredient']
  >;
  export type IngredientInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    productIngredients?: boolean | Ingredient$productIngredientsArgs<ExtArgs>;
    _count?: boolean | IngredientCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type IngredientIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type IngredientIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $IngredientPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Ingredient';
    objects: {
      productIngredients: Prisma.$ProductIngredientPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        name: string;
        isAllergen: boolean;
      },
      ExtArgs['result']['ingredient']
    >;
    composites: {};
  };

  type IngredientGetPayload<
    S extends boolean | null | undefined | IngredientDefaultArgs,
  > = $Result.GetResult<Prisma.$IngredientPayload, S>;

  type IngredientCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    IngredientFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: IngredientCountAggregateInputType | true;
  };

  export interface IngredientDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Ingredient'];
      meta: { name: 'Ingredient' };
    };
    /**
     * Find zero or one Ingredient that matches the filter.
     * @param {IngredientFindUniqueArgs} args - Arguments to find a Ingredient
     * @example
     * // Get one Ingredient
     * const ingredient = await prisma.ingredient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IngredientFindUniqueArgs>(
      args: SelectSubset<T, IngredientFindUniqueArgs<ExtArgs>>,
    ): Prisma__IngredientClient<
      $Result.GetResult<
        Prisma.$IngredientPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Ingredient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IngredientFindUniqueOrThrowArgs} args - Arguments to find a Ingredient
     * @example
     * // Get one Ingredient
     * const ingredient = await prisma.ingredient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IngredientFindUniqueOrThrowArgs>(
      args: SelectSubset<T, IngredientFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__IngredientClient<
      $Result.GetResult<
        Prisma.$IngredientPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Ingredient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientFindFirstArgs} args - Arguments to find a Ingredient
     * @example
     * // Get one Ingredient
     * const ingredient = await prisma.ingredient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IngredientFindFirstArgs>(
      args?: SelectSubset<T, IngredientFindFirstArgs<ExtArgs>>,
    ): Prisma__IngredientClient<
      $Result.GetResult<
        Prisma.$IngredientPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Ingredient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientFindFirstOrThrowArgs} args - Arguments to find a Ingredient
     * @example
     * // Get one Ingredient
     * const ingredient = await prisma.ingredient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IngredientFindFirstOrThrowArgs>(
      args?: SelectSubset<T, IngredientFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__IngredientClient<
      $Result.GetResult<
        Prisma.$IngredientPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Ingredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ingredients
     * const ingredients = await prisma.ingredient.findMany()
     *
     * // Get first 10 Ingredients
     * const ingredients = await prisma.ingredient.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const ingredientWithIdOnly = await prisma.ingredient.findMany({ select: { id: true } })
     *
     */
    findMany<T extends IngredientFindManyArgs>(
      args?: SelectSubset<T, IngredientFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$IngredientPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Ingredient.
     * @param {IngredientCreateArgs} args - Arguments to create a Ingredient.
     * @example
     * // Create one Ingredient
     * const Ingredient = await prisma.ingredient.create({
     *   data: {
     *     // ... data to create a Ingredient
     *   }
     * })
     *
     */
    create<T extends IngredientCreateArgs>(
      args: SelectSubset<T, IngredientCreateArgs<ExtArgs>>,
    ): Prisma__IngredientClient<
      $Result.GetResult<
        Prisma.$IngredientPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Ingredients.
     * @param {IngredientCreateManyArgs} args - Arguments to create many Ingredients.
     * @example
     * // Create many Ingredients
     * const ingredient = await prisma.ingredient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends IngredientCreateManyArgs>(
      args?: SelectSubset<T, IngredientCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Ingredients and returns the data saved in the database.
     * @param {IngredientCreateManyAndReturnArgs} args - Arguments to create many Ingredients.
     * @example
     * // Create many Ingredients
     * const ingredient = await prisma.ingredient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Ingredients and only return the `id`
     * const ingredientWithIdOnly = await prisma.ingredient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends IngredientCreateManyAndReturnArgs>(
      args?: SelectSubset<T, IngredientCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$IngredientPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Ingredient.
     * @param {IngredientDeleteArgs} args - Arguments to delete one Ingredient.
     * @example
     * // Delete one Ingredient
     * const Ingredient = await prisma.ingredient.delete({
     *   where: {
     *     // ... filter to delete one Ingredient
     *   }
     * })
     *
     */
    delete<T extends IngredientDeleteArgs>(
      args: SelectSubset<T, IngredientDeleteArgs<ExtArgs>>,
    ): Prisma__IngredientClient<
      $Result.GetResult<
        Prisma.$IngredientPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Ingredient.
     * @param {IngredientUpdateArgs} args - Arguments to update one Ingredient.
     * @example
     * // Update one Ingredient
     * const ingredient = await prisma.ingredient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends IngredientUpdateArgs>(
      args: SelectSubset<T, IngredientUpdateArgs<ExtArgs>>,
    ): Prisma__IngredientClient<
      $Result.GetResult<
        Prisma.$IngredientPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Ingredients.
     * @param {IngredientDeleteManyArgs} args - Arguments to filter Ingredients to delete.
     * @example
     * // Delete a few Ingredients
     * const { count } = await prisma.ingredient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends IngredientDeleteManyArgs>(
      args?: SelectSubset<T, IngredientDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ingredients
     * const ingredient = await prisma.ingredient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends IngredientUpdateManyArgs>(
      args: SelectSubset<T, IngredientUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Ingredients and returns the data updated in the database.
     * @param {IngredientUpdateManyAndReturnArgs} args - Arguments to update many Ingredients.
     * @example
     * // Update many Ingredients
     * const ingredient = await prisma.ingredient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Ingredients and only return the `id`
     * const ingredientWithIdOnly = await prisma.ingredient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends IngredientUpdateManyAndReturnArgs>(
      args: SelectSubset<T, IngredientUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$IngredientPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Ingredient.
     * @param {IngredientUpsertArgs} args - Arguments to update or create a Ingredient.
     * @example
     * // Update or create a Ingredient
     * const ingredient = await prisma.ingredient.upsert({
     *   create: {
     *     // ... data to create a Ingredient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ingredient we want to update
     *   }
     * })
     */
    upsert<T extends IngredientUpsertArgs>(
      args: SelectSubset<T, IngredientUpsertArgs<ExtArgs>>,
    ): Prisma__IngredientClient<
      $Result.GetResult<
        Prisma.$IngredientPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientCountArgs} args - Arguments to filter Ingredients to count.
     * @example
     * // Count the number of Ingredients
     * const count = await prisma.ingredient.count({
     *   where: {
     *     // ... the filter for the Ingredients we want to count
     *   }
     * })
     **/
    count<T extends IngredientCountArgs>(
      args?: Subset<T, IngredientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IngredientCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Ingredient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends IngredientAggregateArgs>(
      args: Subset<T, IngredientAggregateArgs>,
    ): Prisma.PrismaPromise<GetIngredientAggregateType<T>>;

    /**
     * Group by Ingredient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends IngredientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IngredientGroupByArgs['orderBy'] }
        : { orderBy?: IngredientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, IngredientGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetIngredientGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Ingredient model
     */
    readonly fields: IngredientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ingredient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IngredientClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    productIngredients<
      T extends Ingredient$productIngredientsArgs<ExtArgs> = {},
    >(
      args?: Subset<T, Ingredient$productIngredientsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ProductIngredientPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Ingredient model
   */
  interface IngredientFieldRefs {
    readonly id: FieldRef<'Ingredient', 'Int'>;
    readonly name: FieldRef<'Ingredient', 'String'>;
    readonly isAllergen: FieldRef<'Ingredient', 'Boolean'>;
  }

  // Custom InputTypes
  /**
   * Ingredient findUnique
   */
  export type IngredientFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null;
    /**
     * Filter, which Ingredient to fetch.
     */
    where: IngredientWhereUniqueInput;
  };

  /**
   * Ingredient findUniqueOrThrow
   */
  export type IngredientFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null;
    /**
     * Filter, which Ingredient to fetch.
     */
    where: IngredientWhereUniqueInput;
  };

  /**
   * Ingredient findFirst
   */
  export type IngredientFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null;
    /**
     * Filter, which Ingredient to fetch.
     */
    where?: IngredientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ingredients to fetch.
     */
    orderBy?:
      | IngredientOrderByWithRelationInput
      | IngredientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Ingredients.
     */
    cursor?: IngredientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ingredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Ingredients.
     */
    distinct?: IngredientScalarFieldEnum | IngredientScalarFieldEnum[];
  };

  /**
   * Ingredient findFirstOrThrow
   */
  export type IngredientFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null;
    /**
     * Filter, which Ingredient to fetch.
     */
    where?: IngredientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ingredients to fetch.
     */
    orderBy?:
      | IngredientOrderByWithRelationInput
      | IngredientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Ingredients.
     */
    cursor?: IngredientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ingredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Ingredients.
     */
    distinct?: IngredientScalarFieldEnum | IngredientScalarFieldEnum[];
  };

  /**
   * Ingredient findMany
   */
  export type IngredientFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null;
    /**
     * Filter, which Ingredients to fetch.
     */
    where?: IngredientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ingredients to fetch.
     */
    orderBy?:
      | IngredientOrderByWithRelationInput
      | IngredientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Ingredients.
     */
    cursor?: IngredientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ingredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Ingredients.
     */
    distinct?: IngredientScalarFieldEnum | IngredientScalarFieldEnum[];
  };

  /**
   * Ingredient create
   */
  export type IngredientCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null;
    /**
     * The data needed to create a Ingredient.
     */
    data: XOR<IngredientCreateInput, IngredientUncheckedCreateInput>;
  };

  /**
   * Ingredient createMany
   */
  export type IngredientCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Ingredients.
     */
    data: IngredientCreateManyInput | IngredientCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Ingredient createManyAndReturn
   */
  export type IngredientCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null;
    /**
     * The data used to create many Ingredients.
     */
    data: IngredientCreateManyInput | IngredientCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Ingredient update
   */
  export type IngredientUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null;
    /**
     * The data needed to update a Ingredient.
     */
    data: XOR<IngredientUpdateInput, IngredientUncheckedUpdateInput>;
    /**
     * Choose, which Ingredient to update.
     */
    where: IngredientWhereUniqueInput;
  };

  /**
   * Ingredient updateMany
   */
  export type IngredientUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Ingredients.
     */
    data: XOR<
      IngredientUpdateManyMutationInput,
      IngredientUncheckedUpdateManyInput
    >;
    /**
     * Filter which Ingredients to update
     */
    where?: IngredientWhereInput;
    /**
     * Limit how many Ingredients to update.
     */
    limit?: number;
  };

  /**
   * Ingredient updateManyAndReturn
   */
  export type IngredientUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null;
    /**
     * The data used to update Ingredients.
     */
    data: XOR<
      IngredientUpdateManyMutationInput,
      IngredientUncheckedUpdateManyInput
    >;
    /**
     * Filter which Ingredients to update
     */
    where?: IngredientWhereInput;
    /**
     * Limit how many Ingredients to update.
     */
    limit?: number;
  };

  /**
   * Ingredient upsert
   */
  export type IngredientUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null;
    /**
     * The filter to search for the Ingredient to update in case it exists.
     */
    where: IngredientWhereUniqueInput;
    /**
     * In case the Ingredient found by the `where` argument doesn't exist, create a new Ingredient with this data.
     */
    create: XOR<IngredientCreateInput, IngredientUncheckedCreateInput>;
    /**
     * In case the Ingredient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IngredientUpdateInput, IngredientUncheckedUpdateInput>;
  };

  /**
   * Ingredient delete
   */
  export type IngredientDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null;
    /**
     * Filter which Ingredient to delete.
     */
    where: IngredientWhereUniqueInput;
  };

  /**
   * Ingredient deleteMany
   */
  export type IngredientDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Ingredients to delete
     */
    where?: IngredientWhereInput;
    /**
     * Limit how many Ingredients to delete.
     */
    limit?: number;
  };

  /**
   * Ingredient.productIngredients
   */
  export type Ingredient$productIngredientsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientInclude<ExtArgs> | null;
    where?: ProductIngredientWhereInput;
    orderBy?:
      | ProductIngredientOrderByWithRelationInput
      | ProductIngredientOrderByWithRelationInput[];
    cursor?: ProductIngredientWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?:
      | ProductIngredientScalarFieldEnum
      | ProductIngredientScalarFieldEnum[];
  };

  /**
   * Ingredient without action
   */
  export type IngredientDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: IngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: IngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientInclude<ExtArgs> | null;
  };

  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
  };

  export type ProductAvgAggregateOutputType = {
    id: number | null;
    legacyId: number | null;
    categoryId: number | null;
    price: Decimal | null;
  };

  export type ProductSumAggregateOutputType = {
    id: number | null;
    legacyId: number | null;
    categoryId: number | null;
    price: Decimal | null;
  };

  export type ProductMinAggregateOutputType = {
    id: number | null;
    legacyId: number | null;
    categoryId: number | null;
    name: string | null;
    aiDescription: string | null;
    price: Decimal | null;
    isAvailable: boolean | null;
  };

  export type ProductMaxAggregateOutputType = {
    id: number | null;
    legacyId: number | null;
    categoryId: number | null;
    name: string | null;
    aiDescription: string | null;
    price: Decimal | null;
    isAvailable: boolean | null;
  };

  export type ProductCountAggregateOutputType = {
    id: number;
    legacyId: number;
    categoryId: number;
    name: number;
    aiDescription: number;
    price: number;
    isAvailable: number;
    _all: number;
  };

  export type ProductAvgAggregateInputType = {
    id?: true;
    legacyId?: true;
    categoryId?: true;
    price?: true;
  };

  export type ProductSumAggregateInputType = {
    id?: true;
    legacyId?: true;
    categoryId?: true;
    price?: true;
  };

  export type ProductMinAggregateInputType = {
    id?: true;
    legacyId?: true;
    categoryId?: true;
    name?: true;
    aiDescription?: true;
    price?: true;
    isAvailable?: true;
  };

  export type ProductMaxAggregateInputType = {
    id?: true;
    legacyId?: true;
    categoryId?: true;
    name?: true;
    aiDescription?: true;
    price?: true;
    isAvailable?: true;
  };

  export type ProductCountAggregateInputType = {
    id?: true;
    legacyId?: true;
    categoryId?: true;
    name?: true;
    aiDescription?: true;
    price?: true;
    isAvailable?: true;
    _all?: true;
  };

  export type ProductAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Products
     **/
    _count?: true | ProductCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ProductAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ProductSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProductMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProductMaxAggregateInputType;
  };

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
    [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>;
  };

  export type ProductGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductWhereInput;
    orderBy?:
      | ProductOrderByWithAggregationInput
      | ProductOrderByWithAggregationInput[];
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum;
    having?: ProductScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductCountAggregateInputType | true;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
  };

  export type ProductGroupByOutputType = {
    id: number;
    legacyId: number | null;
    categoryId: number;
    name: string;
    aiDescription: string | null;
    price: Decimal;
    isAvailable: boolean;
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
  };

  type GetProductGroupByPayload<T extends ProductGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ProductGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ProductGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>;
        }
      >
    >;

  export type ProductSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      legacyId?: boolean;
      categoryId?: boolean;
      name?: boolean;
      aiDescription?: boolean;
      price?: boolean;
      isAvailable?: boolean;
      category?: boolean | CategoryDefaultArgs<ExtArgs>;
      productIngredients?: boolean | Product$productIngredientsArgs<ExtArgs>;
      orderItems?: boolean | Product$orderItemsArgs<ExtArgs>;
      _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['product']
  >;

  export type ProductSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      legacyId?: boolean;
      categoryId?: boolean;
      name?: boolean;
      aiDescription?: boolean;
      price?: boolean;
      isAvailable?: boolean;
      category?: boolean | CategoryDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['product']
  >;

  export type ProductSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      legacyId?: boolean;
      categoryId?: boolean;
      name?: boolean;
      aiDescription?: boolean;
      price?: boolean;
      isAvailable?: boolean;
      category?: boolean | CategoryDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['product']
  >;

  export type ProductSelectScalar = {
    id?: boolean;
    legacyId?: boolean;
    categoryId?: boolean;
    name?: boolean;
    aiDescription?: boolean;
    price?: boolean;
    isAvailable?: boolean;
  };

  export type ProductOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'legacyId'
    | 'categoryId'
    | 'name'
    | 'aiDescription'
    | 'price'
    | 'isAvailable',
    ExtArgs['result']['product']
  >;
  export type ProductInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>;
    productIngredients?: boolean | Product$productIngredientsArgs<ExtArgs>;
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>;
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ProductIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>;
  };
  export type ProductIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>;
  };

  export type $ProductPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Product';
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>;
      productIngredients: Prisma.$ProductIngredientPayload<ExtArgs>[];
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        legacyId: number | null;
        categoryId: number;
        name: string;
        aiDescription: string | null;
        price: Prisma.Decimal;
        isAvailable: boolean;
      },
      ExtArgs['result']['product']
    >;
    composites: {};
  };

  type ProductGetPayload<
    S extends boolean | null | undefined | ProductDefaultArgs,
  > = $Result.GetResult<Prisma.$ProductPayload, S>;

  type ProductCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductCountAggregateInputType | true;
  };

  export interface ProductDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Product'];
      meta: { name: 'Product' };
    };
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(
      args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(
      args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     *
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProductFindManyArgs>(
      args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     *
     */
    create<T extends ProductCreateArgs>(
      args: SelectSubset<T, ProductCreateArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductCreateManyArgs>(
      args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     *
     */
    delete<T extends ProductDeleteArgs>(
      args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductUpdateArgs>(
      args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductDeleteManyArgs>(
      args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductUpdateManyArgs>(
      args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(
      args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
     **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProductAggregateArgs>(
      args: Subset<T, ProductAggregateArgs>,
    ): Prisma.PrismaPromise<GetProductAggregateType<T>>;

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetProductGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Product model
     */
    readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, CategoryDefaultArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      | $Result.GetResult<
          Prisma.$CategoryPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    productIngredients<T extends Product$productIngredientsArgs<ExtArgs> = {}>(
      args?: Subset<T, Product$productIngredientsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ProductIngredientPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    orderItems<T extends Product$orderItemsArgs<ExtArgs> = {}>(
      args?: Subset<T, Product$orderItemsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$OrderItemPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<'Product', 'Int'>;
    readonly legacyId: FieldRef<'Product', 'Int'>;
    readonly categoryId: FieldRef<'Product', 'Int'>;
    readonly name: FieldRef<'Product', 'String'>;
    readonly aiDescription: FieldRef<'Product', 'String'>;
    readonly price: FieldRef<'Product', 'Decimal'>;
    readonly isAvailable: FieldRef<'Product', 'Boolean'>;
  }

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Product create
   */
  export type ProductCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>;
  };

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Product update
   */
  export type ProductUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>;
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>;
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput;
    /**
     * Limit how many Products to update.
     */
    limit?: number;
  };

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>;
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput;
    /**
     * Limit how many Products to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput;
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>;
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>;
  };

  /**
   * Product delete
   */
  export type ProductDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput;
    /**
     * Limit how many Products to delete.
     */
    limit?: number;
  };

  /**
   * Product.productIngredients
   */
  export type Product$productIngredientsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientInclude<ExtArgs> | null;
    where?: ProductIngredientWhereInput;
    orderBy?:
      | ProductIngredientOrderByWithRelationInput
      | ProductIngredientOrderByWithRelationInput[];
    cursor?: ProductIngredientWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?:
      | ProductIngredientScalarFieldEnum
      | ProductIngredientScalarFieldEnum[];
  };

  /**
   * Product.orderItems
   */
  export type Product$orderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    where?: OrderItemWhereInput;
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    cursor?: OrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * Product without action
   */
  export type ProductDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
  };

  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null;
    _avg: OrderAvgAggregateOutputType | null;
    _sum: OrderSumAggregateOutputType | null;
    _min: OrderMinAggregateOutputType | null;
    _max: OrderMaxAggregateOutputType | null;
  };

  export type OrderAvgAggregateOutputType = {
    id: number | null;
    tableId: number | null;
    total: Decimal | null;
  };

  export type OrderSumAggregateOutputType = {
    id: number | null;
    tableId: number | null;
    total: Decimal | null;
  };

  export type OrderMinAggregateOutputType = {
    id: number | null;
    tableId: number | null;
    chatSessionId: string | null;
    paymentCode: string | null;
    total: Decimal | null;
    paymentStatus: $Enums.PaymentStatus | null;
    kitchenStatus: $Enums.KitchenStatus | null;
    createdAt: Date | null;
    deletedAt: Date | null;
  };

  export type OrderMaxAggregateOutputType = {
    id: number | null;
    tableId: number | null;
    chatSessionId: string | null;
    paymentCode: string | null;
    total: Decimal | null;
    paymentStatus: $Enums.PaymentStatus | null;
    kitchenStatus: $Enums.KitchenStatus | null;
    createdAt: Date | null;
    deletedAt: Date | null;
  };

  export type OrderCountAggregateOutputType = {
    id: number;
    tableId: number;
    chatSessionId: number;
    paymentCode: number;
    total: number;
    paymentStatus: number;
    kitchenStatus: number;
    createdAt: number;
    deletedAt: number;
    _all: number;
  };

  export type OrderAvgAggregateInputType = {
    id?: true;
    tableId?: true;
    total?: true;
  };

  export type OrderSumAggregateInputType = {
    id?: true;
    tableId?: true;
    total?: true;
  };

  export type OrderMinAggregateInputType = {
    id?: true;
    tableId?: true;
    chatSessionId?: true;
    paymentCode?: true;
    total?: true;
    paymentStatus?: true;
    kitchenStatus?: true;
    createdAt?: true;
    deletedAt?: true;
  };

  export type OrderMaxAggregateInputType = {
    id?: true;
    tableId?: true;
    chatSessionId?: true;
    paymentCode?: true;
    total?: true;
    paymentStatus?: true;
    kitchenStatus?: true;
    createdAt?: true;
    deletedAt?: true;
  };

  export type OrderCountAggregateInputType = {
    id?: true;
    tableId?: true;
    chatSessionId?: true;
    paymentCode?: true;
    total?: true;
    paymentStatus?: true;
    kitchenStatus?: true;
    createdAt?: true;
    deletedAt?: true;
    _all?: true;
  };

  export type OrderAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Orders
     **/
    _count?: true | OrderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: OrderAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: OrderSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrderMaxAggregateInputType;
  };

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
    [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>;
  };

  export type OrderGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderWhereInput;
    orderBy?:
      | OrderOrderByWithAggregationInput
      | OrderOrderByWithAggregationInput[];
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum;
    having?: OrderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderCountAggregateInputType | true;
    _avg?: OrderAvgAggregateInputType;
    _sum?: OrderSumAggregateInputType;
    _min?: OrderMinAggregateInputType;
    _max?: OrderMaxAggregateInputType;
  };

  export type OrderGroupByOutputType = {
    id: number;
    tableId: number;
    chatSessionId: string | null;
    paymentCode: string | null;
    total: Decimal | null;
    paymentStatus: $Enums.PaymentStatus;
    kitchenStatus: $Enums.KitchenStatus;
    createdAt: Date;
    deletedAt: Date | null;
    _count: OrderCountAggregateOutputType | null;
    _avg: OrderAvgAggregateOutputType | null;
    _sum: OrderSumAggregateOutputType | null;
    _min: OrderMinAggregateOutputType | null;
    _max: OrderMaxAggregateOutputType | null;
  };

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<OrderGroupByOutputType, T['by']> & {
          [P in keyof T & keyof OrderGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>;
        }
      >
    >;

  export type OrderSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tableId?: boolean;
      chatSessionId?: boolean;
      paymentCode?: boolean;
      total?: boolean;
      paymentStatus?: boolean;
      kitchenStatus?: boolean;
      createdAt?: boolean;
      deletedAt?: boolean;
      table?: boolean | TableDefaultArgs<ExtArgs>;
      orderItems?: boolean | Order$orderItemsArgs<ExtArgs>;
      _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['order']
  >;

  export type OrderSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tableId?: boolean;
      chatSessionId?: boolean;
      paymentCode?: boolean;
      total?: boolean;
      paymentStatus?: boolean;
      kitchenStatus?: boolean;
      createdAt?: boolean;
      deletedAt?: boolean;
      table?: boolean | TableDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['order']
  >;

  export type OrderSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      tableId?: boolean;
      chatSessionId?: boolean;
      paymentCode?: boolean;
      total?: boolean;
      paymentStatus?: boolean;
      kitchenStatus?: boolean;
      createdAt?: boolean;
      deletedAt?: boolean;
      table?: boolean | TableDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['order']
  >;

  export type OrderSelectScalar = {
    id?: boolean;
    tableId?: boolean;
    chatSessionId?: boolean;
    paymentCode?: boolean;
    total?: boolean;
    paymentStatus?: boolean;
    kitchenStatus?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
  };

  export type OrderOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'tableId'
    | 'chatSessionId'
    | 'paymentCode'
    | 'total'
    | 'paymentStatus'
    | 'kitchenStatus'
    | 'createdAt'
    | 'deletedAt',
    ExtArgs['result']['order']
  >;
  export type OrderInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    table?: boolean | TableDefaultArgs<ExtArgs>;
    orderItems?: boolean | Order$orderItemsArgs<ExtArgs>;
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type OrderIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    table?: boolean | TableDefaultArgs<ExtArgs>;
  };
  export type OrderIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    table?: boolean | TableDefaultArgs<ExtArgs>;
  };

  export type $OrderPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Order';
    objects: {
      table: Prisma.$TablePayload<ExtArgs>;
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        tableId: number;
        chatSessionId: string | null;
        paymentCode: string | null;
        total: Prisma.Decimal | null;
        paymentStatus: $Enums.PaymentStatus;
        kitchenStatus: $Enums.KitchenStatus;
        createdAt: Date;
        deletedAt: Date | null;
      },
      ExtArgs['result']['order']
    >;
    composites: {};
  };

  type OrderGetPayload<
    S extends boolean | null | undefined | OrderDefaultArgs,
  > = $Result.GetResult<Prisma.$OrderPayload, S>;

  type OrderCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrderCountAggregateInputType | true;
  };

  export interface OrderDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Order'];
      meta: { name: 'Order' };
    };
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(
      args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(
      args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(
      args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     *
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderFindManyArgs>(
      args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     *
     */
    create<T extends OrderCreateArgs>(
      args: SelectSubset<T, OrderCreateArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderCreateManyArgs>(
      args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(
      args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     *
     */
    delete<T extends OrderDeleteArgs>(
      args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderUpdateArgs>(
      args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderDeleteManyArgs>(
      args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderUpdateManyArgs>(
      args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(
      args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(
      args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
     **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrderAggregateArgs>(
      args: Subset<T, OrderAggregateArgs>,
    ): Prisma.PrismaPromise<GetOrderAggregateType<T>>;

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetOrderGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Order model
     */
    readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    table<T extends TableDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, TableDefaultArgs<ExtArgs>>,
    ): Prisma__TableClient<
      | $Result.GetResult<
          Prisma.$TablePayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    orderItems<T extends Order$orderItemsArgs<ExtArgs> = {}>(
      args?: Subset<T, Order$orderItemsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$OrderItemPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<'Order', 'Int'>;
    readonly tableId: FieldRef<'Order', 'Int'>;
    readonly chatSessionId: FieldRef<'Order', 'String'>;
    readonly paymentCode: FieldRef<'Order', 'String'>;
    readonly total: FieldRef<'Order', 'Decimal'>;
    readonly paymentStatus: FieldRef<'Order', 'PaymentStatus'>;
    readonly kitchenStatus: FieldRef<'Order', 'KitchenStatus'>;
    readonly createdAt: FieldRef<'Order', 'DateTime'>;
    readonly deletedAt: FieldRef<'Order', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order create
   */
  export type OrderCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>;
  };

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Order update
   */
  export type OrderUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>;
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>;
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput;
    /**
     * Limit how many Orders to update.
     */
    limit?: number;
  };

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>;
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput;
    /**
     * Limit how many Orders to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput;
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>;
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>;
  };

  /**
   * Order delete
   */
  export type OrderDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput;
    /**
     * Limit how many Orders to delete.
     */
    limit?: number;
  };

  /**
   * Order.orderItems
   */
  export type Order$orderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    where?: OrderItemWhereInput;
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    cursor?: OrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * Order without action
   */
  export type OrderDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
  };

  /**
   * Model ProductIngredient
   */

  export type AggregateProductIngredient = {
    _count: ProductIngredientCountAggregateOutputType | null;
    _avg: ProductIngredientAvgAggregateOutputType | null;
    _sum: ProductIngredientSumAggregateOutputType | null;
    _min: ProductIngredientMinAggregateOutputType | null;
    _max: ProductIngredientMaxAggregateOutputType | null;
  };

  export type ProductIngredientAvgAggregateOutputType = {
    productId: number | null;
    ingredientId: number | null;
  };

  export type ProductIngredientSumAggregateOutputType = {
    productId: number | null;
    ingredientId: number | null;
  };

  export type ProductIngredientMinAggregateOutputType = {
    productId: number | null;
    ingredientId: number | null;
    isOptional: boolean | null;
  };

  export type ProductIngredientMaxAggregateOutputType = {
    productId: number | null;
    ingredientId: number | null;
    isOptional: boolean | null;
  };

  export type ProductIngredientCountAggregateOutputType = {
    productId: number;
    ingredientId: number;
    isOptional: number;
    _all: number;
  };

  export type ProductIngredientAvgAggregateInputType = {
    productId?: true;
    ingredientId?: true;
  };

  export type ProductIngredientSumAggregateInputType = {
    productId?: true;
    ingredientId?: true;
  };

  export type ProductIngredientMinAggregateInputType = {
    productId?: true;
    ingredientId?: true;
    isOptional?: true;
  };

  export type ProductIngredientMaxAggregateInputType = {
    productId?: true;
    ingredientId?: true;
    isOptional?: true;
  };

  export type ProductIngredientCountAggregateInputType = {
    productId?: true;
    ingredientId?: true;
    isOptional?: true;
    _all?: true;
  };

  export type ProductIngredientAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ProductIngredient to aggregate.
     */
    where?: ProductIngredientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductIngredients to fetch.
     */
    orderBy?:
      | ProductIngredientOrderByWithRelationInput
      | ProductIngredientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProductIngredientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductIngredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductIngredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ProductIngredients
     **/
    _count?: true | ProductIngredientCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ProductIngredientAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ProductIngredientSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProductIngredientMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProductIngredientMaxAggregateInputType;
  };

  export type GetProductIngredientAggregateType<
    T extends ProductIngredientAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateProductIngredient]: P extends
      | '_count'
      | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductIngredient[P]>
      : GetScalarType<T[P], AggregateProductIngredient[P]>;
  };

  export type ProductIngredientGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductIngredientWhereInput;
    orderBy?:
      | ProductIngredientOrderByWithAggregationInput
      | ProductIngredientOrderByWithAggregationInput[];
    by: ProductIngredientScalarFieldEnum[] | ProductIngredientScalarFieldEnum;
    having?: ProductIngredientScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductIngredientCountAggregateInputType | true;
    _avg?: ProductIngredientAvgAggregateInputType;
    _sum?: ProductIngredientSumAggregateInputType;
    _min?: ProductIngredientMinAggregateInputType;
    _max?: ProductIngredientMaxAggregateInputType;
  };

  export type ProductIngredientGroupByOutputType = {
    productId: number;
    ingredientId: number;
    isOptional: boolean;
    _count: ProductIngredientCountAggregateOutputType | null;
    _avg: ProductIngredientAvgAggregateOutputType | null;
    _sum: ProductIngredientSumAggregateOutputType | null;
    _min: ProductIngredientMinAggregateOutputType | null;
    _max: ProductIngredientMaxAggregateOutputType | null;
  };

  type GetProductIngredientGroupByPayload<
    T extends ProductIngredientGroupByArgs,
  > = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductIngredientGroupByOutputType, T['by']> & {
        [P in keyof T &
          keyof ProductIngredientGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ProductIngredientGroupByOutputType[P]>
          : GetScalarType<T[P], ProductIngredientGroupByOutputType[P]>;
      }
    >
  >;

  export type ProductIngredientSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      productId?: boolean;
      ingredientId?: boolean;
      isOptional?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
      ingredient?: boolean | IngredientDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['productIngredient']
  >;

  export type ProductIngredientSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      productId?: boolean;
      ingredientId?: boolean;
      isOptional?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
      ingredient?: boolean | IngredientDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['productIngredient']
  >;

  export type ProductIngredientSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      productId?: boolean;
      ingredientId?: boolean;
      isOptional?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
      ingredient?: boolean | IngredientDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['productIngredient']
  >;

  export type ProductIngredientSelectScalar = {
    productId?: boolean;
    ingredientId?: boolean;
    isOptional?: boolean;
  };

  export type ProductIngredientOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'productId' | 'ingredientId' | 'isOptional',
    ExtArgs['result']['productIngredient']
  >;
  export type ProductIngredientInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
    ingredient?: boolean | IngredientDefaultArgs<ExtArgs>;
  };
  export type ProductIngredientIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
    ingredient?: boolean | IngredientDefaultArgs<ExtArgs>;
  };
  export type ProductIngredientIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
    ingredient?: boolean | IngredientDefaultArgs<ExtArgs>;
  };

  export type $ProductIngredientPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'ProductIngredient';
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>;
      ingredient: Prisma.$IngredientPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        productId: number;
        ingredientId: number;
        isOptional: boolean;
      },
      ExtArgs['result']['productIngredient']
    >;
    composites: {};
  };

  type ProductIngredientGetPayload<
    S extends boolean | null | undefined | ProductIngredientDefaultArgs,
  > = $Result.GetResult<Prisma.$ProductIngredientPayload, S>;

  type ProductIngredientCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    ProductIngredientFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: ProductIngredientCountAggregateInputType | true;
  };

  export interface ProductIngredientDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ProductIngredient'];
      meta: { name: 'ProductIngredient' };
    };
    /**
     * Find zero or one ProductIngredient that matches the filter.
     * @param {ProductIngredientFindUniqueArgs} args - Arguments to find a ProductIngredient
     * @example
     * // Get one ProductIngredient
     * const productIngredient = await prisma.productIngredient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductIngredientFindUniqueArgs>(
      args: SelectSubset<T, ProductIngredientFindUniqueArgs<ExtArgs>>,
    ): Prisma__ProductIngredientClient<
      $Result.GetResult<
        Prisma.$ProductIngredientPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one ProductIngredient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductIngredientFindUniqueOrThrowArgs} args - Arguments to find a ProductIngredient
     * @example
     * // Get one ProductIngredient
     * const productIngredient = await prisma.productIngredient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductIngredientFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ProductIngredientFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductIngredientClient<
      $Result.GetResult<
        Prisma.$ProductIngredientPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ProductIngredient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductIngredientFindFirstArgs} args - Arguments to find a ProductIngredient
     * @example
     * // Get one ProductIngredient
     * const productIngredient = await prisma.productIngredient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductIngredientFindFirstArgs>(
      args?: SelectSubset<T, ProductIngredientFindFirstArgs<ExtArgs>>,
    ): Prisma__ProductIngredientClient<
      $Result.GetResult<
        Prisma.$ProductIngredientPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ProductIngredient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductIngredientFindFirstOrThrowArgs} args - Arguments to find a ProductIngredient
     * @example
     * // Get one ProductIngredient
     * const productIngredient = await prisma.productIngredient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductIngredientFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProductIngredientFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductIngredientClient<
      $Result.GetResult<
        Prisma.$ProductIngredientPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more ProductIngredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductIngredientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductIngredients
     * const productIngredients = await prisma.productIngredient.findMany()
     *
     * // Get first 10 ProductIngredients
     * const productIngredients = await prisma.productIngredient.findMany({ take: 10 })
     *
     * // Only select the `productId`
     * const productIngredientWithProductIdOnly = await prisma.productIngredient.findMany({ select: { productId: true } })
     *
     */
    findMany<T extends ProductIngredientFindManyArgs>(
      args?: SelectSubset<T, ProductIngredientFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductIngredientPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a ProductIngredient.
     * @param {ProductIngredientCreateArgs} args - Arguments to create a ProductIngredient.
     * @example
     * // Create one ProductIngredient
     * const ProductIngredient = await prisma.productIngredient.create({
     *   data: {
     *     // ... data to create a ProductIngredient
     *   }
     * })
     *
     */
    create<T extends ProductIngredientCreateArgs>(
      args: SelectSubset<T, ProductIngredientCreateArgs<ExtArgs>>,
    ): Prisma__ProductIngredientClient<
      $Result.GetResult<
        Prisma.$ProductIngredientPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many ProductIngredients.
     * @param {ProductIngredientCreateManyArgs} args - Arguments to create many ProductIngredients.
     * @example
     * // Create many ProductIngredients
     * const productIngredient = await prisma.productIngredient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductIngredientCreateManyArgs>(
      args?: SelectSubset<T, ProductIngredientCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ProductIngredients and returns the data saved in the database.
     * @param {ProductIngredientCreateManyAndReturnArgs} args - Arguments to create many ProductIngredients.
     * @example
     * // Create many ProductIngredients
     * const productIngredient = await prisma.productIngredient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ProductIngredients and only return the `productId`
     * const productIngredientWithProductIdOnly = await prisma.productIngredient.createManyAndReturn({
     *   select: { productId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductIngredientCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ProductIngredientCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductIngredientPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a ProductIngredient.
     * @param {ProductIngredientDeleteArgs} args - Arguments to delete one ProductIngredient.
     * @example
     * // Delete one ProductIngredient
     * const ProductIngredient = await prisma.productIngredient.delete({
     *   where: {
     *     // ... filter to delete one ProductIngredient
     *   }
     * })
     *
     */
    delete<T extends ProductIngredientDeleteArgs>(
      args: SelectSubset<T, ProductIngredientDeleteArgs<ExtArgs>>,
    ): Prisma__ProductIngredientClient<
      $Result.GetResult<
        Prisma.$ProductIngredientPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one ProductIngredient.
     * @param {ProductIngredientUpdateArgs} args - Arguments to update one ProductIngredient.
     * @example
     * // Update one ProductIngredient
     * const productIngredient = await prisma.productIngredient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductIngredientUpdateArgs>(
      args: SelectSubset<T, ProductIngredientUpdateArgs<ExtArgs>>,
    ): Prisma__ProductIngredientClient<
      $Result.GetResult<
        Prisma.$ProductIngredientPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more ProductIngredients.
     * @param {ProductIngredientDeleteManyArgs} args - Arguments to filter ProductIngredients to delete.
     * @example
     * // Delete a few ProductIngredients
     * const { count } = await prisma.productIngredient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductIngredientDeleteManyArgs>(
      args?: SelectSubset<T, ProductIngredientDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ProductIngredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductIngredientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductIngredients
     * const productIngredient = await prisma.productIngredient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductIngredientUpdateManyArgs>(
      args: SelectSubset<T, ProductIngredientUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ProductIngredients and returns the data updated in the database.
     * @param {ProductIngredientUpdateManyAndReturnArgs} args - Arguments to update many ProductIngredients.
     * @example
     * // Update many ProductIngredients
     * const productIngredient = await prisma.productIngredient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ProductIngredients and only return the `productId`
     * const productIngredientWithProductIdOnly = await prisma.productIngredient.updateManyAndReturn({
     *   select: { productId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ProductIngredientUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ProductIngredientUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductIngredientPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one ProductIngredient.
     * @param {ProductIngredientUpsertArgs} args - Arguments to update or create a ProductIngredient.
     * @example
     * // Update or create a ProductIngredient
     * const productIngredient = await prisma.productIngredient.upsert({
     *   create: {
     *     // ... data to create a ProductIngredient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductIngredient we want to update
     *   }
     * })
     */
    upsert<T extends ProductIngredientUpsertArgs>(
      args: SelectSubset<T, ProductIngredientUpsertArgs<ExtArgs>>,
    ): Prisma__ProductIngredientClient<
      $Result.GetResult<
        Prisma.$ProductIngredientPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of ProductIngredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductIngredientCountArgs} args - Arguments to filter ProductIngredients to count.
     * @example
     * // Count the number of ProductIngredients
     * const count = await prisma.productIngredient.count({
     *   where: {
     *     // ... the filter for the ProductIngredients we want to count
     *   }
     * })
     **/
    count<T extends ProductIngredientCountArgs>(
      args?: Subset<T, ProductIngredientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<
              T['select'],
              ProductIngredientCountAggregateOutputType
            >
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ProductIngredient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductIngredientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProductIngredientAggregateArgs>(
      args: Subset<T, ProductIngredientAggregateArgs>,
    ): Prisma.PrismaPromise<GetProductIngredientAggregateType<T>>;

    /**
     * Group by ProductIngredient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductIngredientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ProductIngredientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductIngredientGroupByArgs['orderBy'] }
        : { orderBy?: ProductIngredientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ProductIngredientGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetProductIngredientGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ProductIngredient model
     */
    readonly fields: ProductIngredientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductIngredient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductIngredientClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ProductDefaultArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      | $Result.GetResult<
          Prisma.$ProductPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    ingredient<T extends IngredientDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, IngredientDefaultArgs<ExtArgs>>,
    ): Prisma__IngredientClient<
      | $Result.GetResult<
          Prisma.$IngredientPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ProductIngredient model
   */
  interface ProductIngredientFieldRefs {
    readonly productId: FieldRef<'ProductIngredient', 'Int'>;
    readonly ingredientId: FieldRef<'ProductIngredient', 'Int'>;
    readonly isOptional: FieldRef<'ProductIngredient', 'Boolean'>;
  }

  // Custom InputTypes
  /**
   * ProductIngredient findUnique
   */
  export type ProductIngredientFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientInclude<ExtArgs> | null;
    /**
     * Filter, which ProductIngredient to fetch.
     */
    where: ProductIngredientWhereUniqueInput;
  };

  /**
   * ProductIngredient findUniqueOrThrow
   */
  export type ProductIngredientFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientInclude<ExtArgs> | null;
    /**
     * Filter, which ProductIngredient to fetch.
     */
    where: ProductIngredientWhereUniqueInput;
  };

  /**
   * ProductIngredient findFirst
   */
  export type ProductIngredientFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientInclude<ExtArgs> | null;
    /**
     * Filter, which ProductIngredient to fetch.
     */
    where?: ProductIngredientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductIngredients to fetch.
     */
    orderBy?:
      | ProductIngredientOrderByWithRelationInput
      | ProductIngredientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductIngredients.
     */
    cursor?: ProductIngredientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductIngredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductIngredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductIngredients.
     */
    distinct?:
      | ProductIngredientScalarFieldEnum
      | ProductIngredientScalarFieldEnum[];
  };

  /**
   * ProductIngredient findFirstOrThrow
   */
  export type ProductIngredientFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientInclude<ExtArgs> | null;
    /**
     * Filter, which ProductIngredient to fetch.
     */
    where?: ProductIngredientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductIngredients to fetch.
     */
    orderBy?:
      | ProductIngredientOrderByWithRelationInput
      | ProductIngredientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductIngredients.
     */
    cursor?: ProductIngredientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductIngredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductIngredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductIngredients.
     */
    distinct?:
      | ProductIngredientScalarFieldEnum
      | ProductIngredientScalarFieldEnum[];
  };

  /**
   * ProductIngredient findMany
   */
  export type ProductIngredientFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientInclude<ExtArgs> | null;
    /**
     * Filter, which ProductIngredients to fetch.
     */
    where?: ProductIngredientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductIngredients to fetch.
     */
    orderBy?:
      | ProductIngredientOrderByWithRelationInput
      | ProductIngredientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ProductIngredients.
     */
    cursor?: ProductIngredientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductIngredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductIngredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductIngredients.
     */
    distinct?:
      | ProductIngredientScalarFieldEnum
      | ProductIngredientScalarFieldEnum[];
  };

  /**
   * ProductIngredient create
   */
  export type ProductIngredientCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientInclude<ExtArgs> | null;
    /**
     * The data needed to create a ProductIngredient.
     */
    data: XOR<
      ProductIngredientCreateInput,
      ProductIngredientUncheckedCreateInput
    >;
  };

  /**
   * ProductIngredient createMany
   */
  export type ProductIngredientCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ProductIngredients.
     */
    data: ProductIngredientCreateManyInput | ProductIngredientCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ProductIngredient createManyAndReturn
   */
  export type ProductIngredientCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * The data used to create many ProductIngredients.
     */
    data: ProductIngredientCreateManyInput | ProductIngredientCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ProductIngredient update
   */
  export type ProductIngredientUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientInclude<ExtArgs> | null;
    /**
     * The data needed to update a ProductIngredient.
     */
    data: XOR<
      ProductIngredientUpdateInput,
      ProductIngredientUncheckedUpdateInput
    >;
    /**
     * Choose, which ProductIngredient to update.
     */
    where: ProductIngredientWhereUniqueInput;
  };

  /**
   * ProductIngredient updateMany
   */
  export type ProductIngredientUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ProductIngredients.
     */
    data: XOR<
      ProductIngredientUpdateManyMutationInput,
      ProductIngredientUncheckedUpdateManyInput
    >;
    /**
     * Filter which ProductIngredients to update
     */
    where?: ProductIngredientWhereInput;
    /**
     * Limit how many ProductIngredients to update.
     */
    limit?: number;
  };

  /**
   * ProductIngredient updateManyAndReturn
   */
  export type ProductIngredientUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * The data used to update ProductIngredients.
     */
    data: XOR<
      ProductIngredientUpdateManyMutationInput,
      ProductIngredientUncheckedUpdateManyInput
    >;
    /**
     * Filter which ProductIngredients to update
     */
    where?: ProductIngredientWhereInput;
    /**
     * Limit how many ProductIngredients to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ProductIngredient upsert
   */
  export type ProductIngredientUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientInclude<ExtArgs> | null;
    /**
     * The filter to search for the ProductIngredient to update in case it exists.
     */
    where: ProductIngredientWhereUniqueInput;
    /**
     * In case the ProductIngredient found by the `where` argument doesn't exist, create a new ProductIngredient with this data.
     */
    create: XOR<
      ProductIngredientCreateInput,
      ProductIngredientUncheckedCreateInput
    >;
    /**
     * In case the ProductIngredient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<
      ProductIngredientUpdateInput,
      ProductIngredientUncheckedUpdateInput
    >;
  };

  /**
   * ProductIngredient delete
   */
  export type ProductIngredientDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientInclude<ExtArgs> | null;
    /**
     * Filter which ProductIngredient to delete.
     */
    where: ProductIngredientWhereUniqueInput;
  };

  /**
   * ProductIngredient deleteMany
   */
  export type ProductIngredientDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ProductIngredients to delete
     */
    where?: ProductIngredientWhereInput;
    /**
     * Limit how many ProductIngredients to delete.
     */
    limit?: number;
  };

  /**
   * ProductIngredient without action
   */
  export type ProductIngredientDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductIngredient
     */
    select?: ProductIngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductIngredient
     */
    omit?: ProductIngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIngredientInclude<ExtArgs> | null;
  };

  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null;
    _avg: OrderItemAvgAggregateOutputType | null;
    _sum: OrderItemSumAggregateOutputType | null;
    _min: OrderItemMinAggregateOutputType | null;
    _max: OrderItemMaxAggregateOutputType | null;
  };

  export type OrderItemAvgAggregateOutputType = {
    id: number | null;
    orderId: number | null;
    productId: number | null;
    quantity: number | null;
    unitPrice: Decimal | null;
  };

  export type OrderItemSumAggregateOutputType = {
    id: number | null;
    orderId: number | null;
    productId: number | null;
    quantity: number | null;
    unitPrice: Decimal | null;
  };

  export type OrderItemMinAggregateOutputType = {
    id: number | null;
    orderId: number | null;
    productId: number | null;
    quantity: number | null;
    unitPrice: Decimal | null;
    aiNotes: string | null;
  };

  export type OrderItemMaxAggregateOutputType = {
    id: number | null;
    orderId: number | null;
    productId: number | null;
    quantity: number | null;
    unitPrice: Decimal | null;
    aiNotes: string | null;
  };

  export type OrderItemCountAggregateOutputType = {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    aiNotes: number;
    _all: number;
  };

  export type OrderItemAvgAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    quantity?: true;
    unitPrice?: true;
  };

  export type OrderItemSumAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    quantity?: true;
    unitPrice?: true;
  };

  export type OrderItemMinAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    quantity?: true;
    unitPrice?: true;
    aiNotes?: true;
  };

  export type OrderItemMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    quantity?: true;
    unitPrice?: true;
    aiNotes?: true;
  };

  export type OrderItemCountAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    quantity?: true;
    unitPrice?: true;
    aiNotes?: true;
    _all?: true;
  };

  export type OrderItemAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OrderItems
     **/
    _count?: true | OrderItemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: OrderItemAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: OrderItemSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrderItemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrderItemMaxAggregateInputType;
  };

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>;
  };

  export type OrderItemGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderItemWhereInput;
    orderBy?:
      | OrderItemOrderByWithAggregationInput
      | OrderItemOrderByWithAggregationInput[];
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum;
    having?: OrderItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderItemCountAggregateInputType | true;
    _avg?: OrderItemAvgAggregateInputType;
    _sum?: OrderItemSumAggregateInputType;
    _min?: OrderItemMinAggregateInputType;
    _max?: OrderItemMaxAggregateInputType;
  };

  export type OrderItemGroupByOutputType = {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: Decimal;
    aiNotes: string | null;
    _count: OrderItemCountAggregateOutputType | null;
    _avg: OrderItemAvgAggregateOutputType | null;
    _sum: OrderItemSumAggregateOutputType | null;
    _min: OrderItemMinAggregateOutputType | null;
    _max: OrderItemMaxAggregateOutputType | null;
  };

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<OrderItemGroupByOutputType, T['by']> & {
          [P in keyof T & keyof OrderItemGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>;
        }
      >
    >;

  export type OrderItemSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderId?: boolean;
      productId?: boolean;
      quantity?: boolean;
      unitPrice?: boolean;
      aiNotes?: boolean;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['orderItem']
  >;

  export type OrderItemSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderId?: boolean;
      productId?: boolean;
      quantity?: boolean;
      unitPrice?: boolean;
      aiNotes?: boolean;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['orderItem']
  >;

  export type OrderItemSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderId?: boolean;
      productId?: boolean;
      quantity?: boolean;
      unitPrice?: boolean;
      aiNotes?: boolean;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['orderItem']
  >;

  export type OrderItemSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    aiNotes?: boolean;
  };

  export type OrderItemOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'orderId' | 'productId' | 'quantity' | 'unitPrice' | 'aiNotes',
    ExtArgs['result']['orderItem']
  >;
  export type OrderItemInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
    product?: boolean | ProductDefaultArgs<ExtArgs>;
  };
  export type OrderItemIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
    product?: boolean | ProductDefaultArgs<ExtArgs>;
  };
  export type OrderItemIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
    product?: boolean | ProductDefaultArgs<ExtArgs>;
  };

  export type $OrderItemPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'OrderItem';
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>;
      product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        orderId: number;
        productId: number;
        quantity: number;
        unitPrice: Prisma.Decimal;
        aiNotes: string | null;
      },
      ExtArgs['result']['orderItem']
    >;
    composites: {};
  };

  type OrderItemGetPayload<
    S extends boolean | null | undefined | OrderItemDefaultArgs,
  > = $Result.GetResult<Prisma.$OrderItemPayload, S>;

  type OrderItemCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    OrderItemFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: OrderItemCountAggregateInputType | true;
  };

  export interface OrderItemDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'];
      meta: { name: 'OrderItem' };
    };
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(
      args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(
      args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(
      args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     *
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderItemFindManyArgs>(
      args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     *
     */
    create<T extends OrderItemCreateArgs>(
      args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderItemCreateManyArgs>(
      args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(
      args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     *
     */
    delete<T extends OrderItemDeleteArgs>(
      args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderItemUpdateArgs>(
      args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(
      args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderItemUpdateManyArgs>(
      args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(
      args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(
      args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
     **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrderItemAggregateArgs>(
      args: Subset<T, OrderItemAggregateArgs>,
    ): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>;

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetOrderItemGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OrderItem model
     */
    readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, OrderDefaultArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      | $Result.GetResult<
          Prisma.$OrderPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ProductDefaultArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      | $Result.GetResult<
          Prisma.$ProductPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<'OrderItem', 'Int'>;
    readonly orderId: FieldRef<'OrderItem', 'Int'>;
    readonly productId: FieldRef<'OrderItem', 'Int'>;
    readonly quantity: FieldRef<'OrderItem', 'Int'>;
    readonly unitPrice: FieldRef<'OrderItem', 'Decimal'>;
    readonly aiNotes: FieldRef<'OrderItem', 'String'>;
  }

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>;
  };

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>;
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<
      OrderItemUpdateManyMutationInput,
      OrderItemUncheckedUpdateManyInput
    >;
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput;
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number;
  };

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * The data used to update OrderItems.
     */
    data: XOR<
      OrderItemUpdateManyMutationInput,
      OrderItemUncheckedUpdateManyInput
    >;
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput;
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput;
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>;
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>;
  };

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput;
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number;
  };

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
  };

  /**
   * Model N8nChatHistory
   */

  export type AggregateN8nChatHistory = {
    _count: N8nChatHistoryCountAggregateOutputType | null;
    _avg: N8nChatHistoryAvgAggregateOutputType | null;
    _sum: N8nChatHistorySumAggregateOutputType | null;
    _min: N8nChatHistoryMinAggregateOutputType | null;
    _max: N8nChatHistoryMaxAggregateOutputType | null;
  };

  export type N8nChatHistoryAvgAggregateOutputType = {
    id: number | null;
  };

  export type N8nChatHistorySumAggregateOutputType = {
    id: number | null;
  };

  export type N8nChatHistoryMinAggregateOutputType = {
    id: number | null;
    sessionId: string | null;
  };

  export type N8nChatHistoryMaxAggregateOutputType = {
    id: number | null;
    sessionId: string | null;
  };

  export type N8nChatHistoryCountAggregateOutputType = {
    id: number;
    sessionId: number;
    message: number;
    _all: number;
  };

  export type N8nChatHistoryAvgAggregateInputType = {
    id?: true;
  };

  export type N8nChatHistorySumAggregateInputType = {
    id?: true;
  };

  export type N8nChatHistoryMinAggregateInputType = {
    id?: true;
    sessionId?: true;
  };

  export type N8nChatHistoryMaxAggregateInputType = {
    id?: true;
    sessionId?: true;
  };

  export type N8nChatHistoryCountAggregateInputType = {
    id?: true;
    sessionId?: true;
    message?: true;
    _all?: true;
  };

  export type N8nChatHistoryAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which N8nChatHistory to aggregate.
     */
    where?: N8nChatHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of N8nChatHistories to fetch.
     */
    orderBy?:
      | N8nChatHistoryOrderByWithRelationInput
      | N8nChatHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: N8nChatHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` N8nChatHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` N8nChatHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned N8nChatHistories
     **/
    _count?: true | N8nChatHistoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: N8nChatHistoryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: N8nChatHistorySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: N8nChatHistoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: N8nChatHistoryMaxAggregateInputType;
  };

  export type GetN8nChatHistoryAggregateType<
    T extends N8nChatHistoryAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateN8nChatHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateN8nChatHistory[P]>
      : GetScalarType<T[P], AggregateN8nChatHistory[P]>;
  };

  export type N8nChatHistoryGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: N8nChatHistoryWhereInput;
    orderBy?:
      | N8nChatHistoryOrderByWithAggregationInput
      | N8nChatHistoryOrderByWithAggregationInput[];
    by: N8nChatHistoryScalarFieldEnum[] | N8nChatHistoryScalarFieldEnum;
    having?: N8nChatHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: N8nChatHistoryCountAggregateInputType | true;
    _avg?: N8nChatHistoryAvgAggregateInputType;
    _sum?: N8nChatHistorySumAggregateInputType;
    _min?: N8nChatHistoryMinAggregateInputType;
    _max?: N8nChatHistoryMaxAggregateInputType;
  };

  export type N8nChatHistoryGroupByOutputType = {
    id: number;
    sessionId: string;
    message: JsonValue;
    _count: N8nChatHistoryCountAggregateOutputType | null;
    _avg: N8nChatHistoryAvgAggregateOutputType | null;
    _sum: N8nChatHistorySumAggregateOutputType | null;
    _min: N8nChatHistoryMinAggregateOutputType | null;
    _max: N8nChatHistoryMaxAggregateOutputType | null;
  };

  type GetN8nChatHistoryGroupByPayload<T extends N8nChatHistoryGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<N8nChatHistoryGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof N8nChatHistoryGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], N8nChatHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], N8nChatHistoryGroupByOutputType[P]>;
        }
      >
    >;

  export type N8nChatHistorySelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sessionId?: boolean;
      message?: boolean;
    },
    ExtArgs['result']['n8nChatHistory']
  >;

  export type N8nChatHistorySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sessionId?: boolean;
      message?: boolean;
    },
    ExtArgs['result']['n8nChatHistory']
  >;

  export type N8nChatHistorySelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sessionId?: boolean;
      message?: boolean;
    },
    ExtArgs['result']['n8nChatHistory']
  >;

  export type N8nChatHistorySelectScalar = {
    id?: boolean;
    sessionId?: boolean;
    message?: boolean;
  };

  export type N8nChatHistoryOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'sessionId' | 'message',
    ExtArgs['result']['n8nChatHistory']
  >;

  export type $N8nChatHistoryPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'N8nChatHistory';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        sessionId: string;
        message: Prisma.JsonValue;
      },
      ExtArgs['result']['n8nChatHistory']
    >;
    composites: {};
  };

  type N8nChatHistoryGetPayload<
    S extends boolean | null | undefined | N8nChatHistoryDefaultArgs,
  > = $Result.GetResult<Prisma.$N8nChatHistoryPayload, S>;

  type N8nChatHistoryCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    N8nChatHistoryFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: N8nChatHistoryCountAggregateInputType | true;
  };

  export interface N8nChatHistoryDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['N8nChatHistory'];
      meta: { name: 'N8nChatHistory' };
    };
    /**
     * Find zero or one N8nChatHistory that matches the filter.
     * @param {N8nChatHistoryFindUniqueArgs} args - Arguments to find a N8nChatHistory
     * @example
     * // Get one N8nChatHistory
     * const n8nChatHistory = await prisma.n8nChatHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends N8nChatHistoryFindUniqueArgs>(
      args: SelectSubset<T, N8nChatHistoryFindUniqueArgs<ExtArgs>>,
    ): Prisma__N8nChatHistoryClient<
      $Result.GetResult<
        Prisma.$N8nChatHistoryPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one N8nChatHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {N8nChatHistoryFindUniqueOrThrowArgs} args - Arguments to find a N8nChatHistory
     * @example
     * // Get one N8nChatHistory
     * const n8nChatHistory = await prisma.n8nChatHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends N8nChatHistoryFindUniqueOrThrowArgs>(
      args: SelectSubset<T, N8nChatHistoryFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__N8nChatHistoryClient<
      $Result.GetResult<
        Prisma.$N8nChatHistoryPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first N8nChatHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {N8nChatHistoryFindFirstArgs} args - Arguments to find a N8nChatHistory
     * @example
     * // Get one N8nChatHistory
     * const n8nChatHistory = await prisma.n8nChatHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends N8nChatHistoryFindFirstArgs>(
      args?: SelectSubset<T, N8nChatHistoryFindFirstArgs<ExtArgs>>,
    ): Prisma__N8nChatHistoryClient<
      $Result.GetResult<
        Prisma.$N8nChatHistoryPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first N8nChatHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {N8nChatHistoryFindFirstOrThrowArgs} args - Arguments to find a N8nChatHistory
     * @example
     * // Get one N8nChatHistory
     * const n8nChatHistory = await prisma.n8nChatHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends N8nChatHistoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, N8nChatHistoryFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__N8nChatHistoryClient<
      $Result.GetResult<
        Prisma.$N8nChatHistoryPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more N8nChatHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {N8nChatHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all N8nChatHistories
     * const n8nChatHistories = await prisma.n8nChatHistory.findMany()
     *
     * // Get first 10 N8nChatHistories
     * const n8nChatHistories = await prisma.n8nChatHistory.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const n8nChatHistoryWithIdOnly = await prisma.n8nChatHistory.findMany({ select: { id: true } })
     *
     */
    findMany<T extends N8nChatHistoryFindManyArgs>(
      args?: SelectSubset<T, N8nChatHistoryFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$N8nChatHistoryPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a N8nChatHistory.
     * @param {N8nChatHistoryCreateArgs} args - Arguments to create a N8nChatHistory.
     * @example
     * // Create one N8nChatHistory
     * const N8nChatHistory = await prisma.n8nChatHistory.create({
     *   data: {
     *     // ... data to create a N8nChatHistory
     *   }
     * })
     *
     */
    create<T extends N8nChatHistoryCreateArgs>(
      args: SelectSubset<T, N8nChatHistoryCreateArgs<ExtArgs>>,
    ): Prisma__N8nChatHistoryClient<
      $Result.GetResult<
        Prisma.$N8nChatHistoryPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many N8nChatHistories.
     * @param {N8nChatHistoryCreateManyArgs} args - Arguments to create many N8nChatHistories.
     * @example
     * // Create many N8nChatHistories
     * const n8nChatHistory = await prisma.n8nChatHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends N8nChatHistoryCreateManyArgs>(
      args?: SelectSubset<T, N8nChatHistoryCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many N8nChatHistories and returns the data saved in the database.
     * @param {N8nChatHistoryCreateManyAndReturnArgs} args - Arguments to create many N8nChatHistories.
     * @example
     * // Create many N8nChatHistories
     * const n8nChatHistory = await prisma.n8nChatHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many N8nChatHistories and only return the `id`
     * const n8nChatHistoryWithIdOnly = await prisma.n8nChatHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends N8nChatHistoryCreateManyAndReturnArgs>(
      args?: SelectSubset<T, N8nChatHistoryCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$N8nChatHistoryPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a N8nChatHistory.
     * @param {N8nChatHistoryDeleteArgs} args - Arguments to delete one N8nChatHistory.
     * @example
     * // Delete one N8nChatHistory
     * const N8nChatHistory = await prisma.n8nChatHistory.delete({
     *   where: {
     *     // ... filter to delete one N8nChatHistory
     *   }
     * })
     *
     */
    delete<T extends N8nChatHistoryDeleteArgs>(
      args: SelectSubset<T, N8nChatHistoryDeleteArgs<ExtArgs>>,
    ): Prisma__N8nChatHistoryClient<
      $Result.GetResult<
        Prisma.$N8nChatHistoryPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one N8nChatHistory.
     * @param {N8nChatHistoryUpdateArgs} args - Arguments to update one N8nChatHistory.
     * @example
     * // Update one N8nChatHistory
     * const n8nChatHistory = await prisma.n8nChatHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends N8nChatHistoryUpdateArgs>(
      args: SelectSubset<T, N8nChatHistoryUpdateArgs<ExtArgs>>,
    ): Prisma__N8nChatHistoryClient<
      $Result.GetResult<
        Prisma.$N8nChatHistoryPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more N8nChatHistories.
     * @param {N8nChatHistoryDeleteManyArgs} args - Arguments to filter N8nChatHistories to delete.
     * @example
     * // Delete a few N8nChatHistories
     * const { count } = await prisma.n8nChatHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends N8nChatHistoryDeleteManyArgs>(
      args?: SelectSubset<T, N8nChatHistoryDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more N8nChatHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {N8nChatHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many N8nChatHistories
     * const n8nChatHistory = await prisma.n8nChatHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends N8nChatHistoryUpdateManyArgs>(
      args: SelectSubset<T, N8nChatHistoryUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more N8nChatHistories and returns the data updated in the database.
     * @param {N8nChatHistoryUpdateManyAndReturnArgs} args - Arguments to update many N8nChatHistories.
     * @example
     * // Update many N8nChatHistories
     * const n8nChatHistory = await prisma.n8nChatHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more N8nChatHistories and only return the `id`
     * const n8nChatHistoryWithIdOnly = await prisma.n8nChatHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends N8nChatHistoryUpdateManyAndReturnArgs>(
      args: SelectSubset<T, N8nChatHistoryUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$N8nChatHistoryPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one N8nChatHistory.
     * @param {N8nChatHistoryUpsertArgs} args - Arguments to update or create a N8nChatHistory.
     * @example
     * // Update or create a N8nChatHistory
     * const n8nChatHistory = await prisma.n8nChatHistory.upsert({
     *   create: {
     *     // ... data to create a N8nChatHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the N8nChatHistory we want to update
     *   }
     * })
     */
    upsert<T extends N8nChatHistoryUpsertArgs>(
      args: SelectSubset<T, N8nChatHistoryUpsertArgs<ExtArgs>>,
    ): Prisma__N8nChatHistoryClient<
      $Result.GetResult<
        Prisma.$N8nChatHistoryPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of N8nChatHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {N8nChatHistoryCountArgs} args - Arguments to filter N8nChatHistories to count.
     * @example
     * // Count the number of N8nChatHistories
     * const count = await prisma.n8nChatHistory.count({
     *   where: {
     *     // ... the filter for the N8nChatHistories we want to count
     *   }
     * })
     **/
    count<T extends N8nChatHistoryCountArgs>(
      args?: Subset<T, N8nChatHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], N8nChatHistoryCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a N8nChatHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {N8nChatHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends N8nChatHistoryAggregateArgs>(
      args: Subset<T, N8nChatHistoryAggregateArgs>,
    ): Prisma.PrismaPromise<GetN8nChatHistoryAggregateType<T>>;

    /**
     * Group by N8nChatHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {N8nChatHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends N8nChatHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: N8nChatHistoryGroupByArgs['orderBy'] }
        : { orderBy?: N8nChatHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, N8nChatHistoryGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetN8nChatHistoryGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the N8nChatHistory model
     */
    readonly fields: N8nChatHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for N8nChatHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__N8nChatHistoryClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the N8nChatHistory model
   */
  interface N8nChatHistoryFieldRefs {
    readonly id: FieldRef<'N8nChatHistory', 'Int'>;
    readonly sessionId: FieldRef<'N8nChatHistory', 'String'>;
    readonly message: FieldRef<'N8nChatHistory', 'Json'>;
  }

  // Custom InputTypes
  /**
   * N8nChatHistory findUnique
   */
  export type N8nChatHistoryFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the N8nChatHistory
     */
    select?: N8nChatHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the N8nChatHistory
     */
    omit?: N8nChatHistoryOmit<ExtArgs> | null;
    /**
     * Filter, which N8nChatHistory to fetch.
     */
    where: N8nChatHistoryWhereUniqueInput;
  };

  /**
   * N8nChatHistory findUniqueOrThrow
   */
  export type N8nChatHistoryFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the N8nChatHistory
     */
    select?: N8nChatHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the N8nChatHistory
     */
    omit?: N8nChatHistoryOmit<ExtArgs> | null;
    /**
     * Filter, which N8nChatHistory to fetch.
     */
    where: N8nChatHistoryWhereUniqueInput;
  };

  /**
   * N8nChatHistory findFirst
   */
  export type N8nChatHistoryFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the N8nChatHistory
     */
    select?: N8nChatHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the N8nChatHistory
     */
    omit?: N8nChatHistoryOmit<ExtArgs> | null;
    /**
     * Filter, which N8nChatHistory to fetch.
     */
    where?: N8nChatHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of N8nChatHistories to fetch.
     */
    orderBy?:
      | N8nChatHistoryOrderByWithRelationInput
      | N8nChatHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for N8nChatHistories.
     */
    cursor?: N8nChatHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` N8nChatHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` N8nChatHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of N8nChatHistories.
     */
    distinct?: N8nChatHistoryScalarFieldEnum | N8nChatHistoryScalarFieldEnum[];
  };

  /**
   * N8nChatHistory findFirstOrThrow
   */
  export type N8nChatHistoryFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the N8nChatHistory
     */
    select?: N8nChatHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the N8nChatHistory
     */
    omit?: N8nChatHistoryOmit<ExtArgs> | null;
    /**
     * Filter, which N8nChatHistory to fetch.
     */
    where?: N8nChatHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of N8nChatHistories to fetch.
     */
    orderBy?:
      | N8nChatHistoryOrderByWithRelationInput
      | N8nChatHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for N8nChatHistories.
     */
    cursor?: N8nChatHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` N8nChatHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` N8nChatHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of N8nChatHistories.
     */
    distinct?: N8nChatHistoryScalarFieldEnum | N8nChatHistoryScalarFieldEnum[];
  };

  /**
   * N8nChatHistory findMany
   */
  export type N8nChatHistoryFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the N8nChatHistory
     */
    select?: N8nChatHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the N8nChatHistory
     */
    omit?: N8nChatHistoryOmit<ExtArgs> | null;
    /**
     * Filter, which N8nChatHistories to fetch.
     */
    where?: N8nChatHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of N8nChatHistories to fetch.
     */
    orderBy?:
      | N8nChatHistoryOrderByWithRelationInput
      | N8nChatHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing N8nChatHistories.
     */
    cursor?: N8nChatHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` N8nChatHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` N8nChatHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of N8nChatHistories.
     */
    distinct?: N8nChatHistoryScalarFieldEnum | N8nChatHistoryScalarFieldEnum[];
  };

  /**
   * N8nChatHistory create
   */
  export type N8nChatHistoryCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the N8nChatHistory
     */
    select?: N8nChatHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the N8nChatHistory
     */
    omit?: N8nChatHistoryOmit<ExtArgs> | null;
    /**
     * The data needed to create a N8nChatHistory.
     */
    data: XOR<N8nChatHistoryCreateInput, N8nChatHistoryUncheckedCreateInput>;
  };

  /**
   * N8nChatHistory createMany
   */
  export type N8nChatHistoryCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many N8nChatHistories.
     */
    data: N8nChatHistoryCreateManyInput | N8nChatHistoryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * N8nChatHistory createManyAndReturn
   */
  export type N8nChatHistoryCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the N8nChatHistory
     */
    select?: N8nChatHistorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the N8nChatHistory
     */
    omit?: N8nChatHistoryOmit<ExtArgs> | null;
    /**
     * The data used to create many N8nChatHistories.
     */
    data: N8nChatHistoryCreateManyInput | N8nChatHistoryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * N8nChatHistory update
   */
  export type N8nChatHistoryUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the N8nChatHistory
     */
    select?: N8nChatHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the N8nChatHistory
     */
    omit?: N8nChatHistoryOmit<ExtArgs> | null;
    /**
     * The data needed to update a N8nChatHistory.
     */
    data: XOR<N8nChatHistoryUpdateInput, N8nChatHistoryUncheckedUpdateInput>;
    /**
     * Choose, which N8nChatHistory to update.
     */
    where: N8nChatHistoryWhereUniqueInput;
  };

  /**
   * N8nChatHistory updateMany
   */
  export type N8nChatHistoryUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update N8nChatHistories.
     */
    data: XOR<
      N8nChatHistoryUpdateManyMutationInput,
      N8nChatHistoryUncheckedUpdateManyInput
    >;
    /**
     * Filter which N8nChatHistories to update
     */
    where?: N8nChatHistoryWhereInput;
    /**
     * Limit how many N8nChatHistories to update.
     */
    limit?: number;
  };

  /**
   * N8nChatHistory updateManyAndReturn
   */
  export type N8nChatHistoryUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the N8nChatHistory
     */
    select?: N8nChatHistorySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the N8nChatHistory
     */
    omit?: N8nChatHistoryOmit<ExtArgs> | null;
    /**
     * The data used to update N8nChatHistories.
     */
    data: XOR<
      N8nChatHistoryUpdateManyMutationInput,
      N8nChatHistoryUncheckedUpdateManyInput
    >;
    /**
     * Filter which N8nChatHistories to update
     */
    where?: N8nChatHistoryWhereInput;
    /**
     * Limit how many N8nChatHistories to update.
     */
    limit?: number;
  };

  /**
   * N8nChatHistory upsert
   */
  export type N8nChatHistoryUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the N8nChatHistory
     */
    select?: N8nChatHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the N8nChatHistory
     */
    omit?: N8nChatHistoryOmit<ExtArgs> | null;
    /**
     * The filter to search for the N8nChatHistory to update in case it exists.
     */
    where: N8nChatHistoryWhereUniqueInput;
    /**
     * In case the N8nChatHistory found by the `where` argument doesn't exist, create a new N8nChatHistory with this data.
     */
    create: XOR<N8nChatHistoryCreateInput, N8nChatHistoryUncheckedCreateInput>;
    /**
     * In case the N8nChatHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<N8nChatHistoryUpdateInput, N8nChatHistoryUncheckedUpdateInput>;
  };

  /**
   * N8nChatHistory delete
   */
  export type N8nChatHistoryDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the N8nChatHistory
     */
    select?: N8nChatHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the N8nChatHistory
     */
    omit?: N8nChatHistoryOmit<ExtArgs> | null;
    /**
     * Filter which N8nChatHistory to delete.
     */
    where: N8nChatHistoryWhereUniqueInput;
  };

  /**
   * N8nChatHistory deleteMany
   */
  export type N8nChatHistoryDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which N8nChatHistories to delete
     */
    where?: N8nChatHistoryWhereInput;
    /**
     * Limit how many N8nChatHistories to delete.
     */
    limit?: number;
  };

  /**
   * N8nChatHistory without action
   */
  export type N8nChatHistoryDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the N8nChatHistory
     */
    select?: N8nChatHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the N8nChatHistory
     */
    omit?: N8nChatHistoryOmit<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const CategoryScalarFieldEnum: {
    id: 'id';
    name: 'name';
    isActive: 'isActive';
  };

  export type CategoryScalarFieldEnum =
    (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];

  export const TableScalarFieldEnum: {
    id: 'id';
    tableName: 'tableName';
    status: 'status';
  };

  export type TableScalarFieldEnum =
    (typeof TableScalarFieldEnum)[keyof typeof TableScalarFieldEnum];

  export const IngredientScalarFieldEnum: {
    id: 'id';
    name: 'name';
    isAllergen: 'isAllergen';
  };

  export type IngredientScalarFieldEnum =
    (typeof IngredientScalarFieldEnum)[keyof typeof IngredientScalarFieldEnum];

  export const ProductScalarFieldEnum: {
    id: 'id';
    legacyId: 'legacyId';
    categoryId: 'categoryId';
    name: 'name';
    aiDescription: 'aiDescription';
    price: 'price';
    isAvailable: 'isAvailable';
  };

  export type ProductScalarFieldEnum =
    (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];

  export const OrderScalarFieldEnum: {
    id: 'id';
    tableId: 'tableId';
    chatSessionId: 'chatSessionId';
    paymentCode: 'paymentCode';
    total: 'total';
    paymentStatus: 'paymentStatus';
    kitchenStatus: 'kitchenStatus';
    createdAt: 'createdAt';
    deletedAt: 'deletedAt';
  };

  export type OrderScalarFieldEnum =
    (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];

  export const ProductIngredientScalarFieldEnum: {
    productId: 'productId';
    ingredientId: 'ingredientId';
    isOptional: 'isOptional';
  };

  export type ProductIngredientScalarFieldEnum =
    (typeof ProductIngredientScalarFieldEnum)[keyof typeof ProductIngredientScalarFieldEnum];

  export const OrderItemScalarFieldEnum: {
    id: 'id';
    orderId: 'orderId';
    productId: 'productId';
    quantity: 'quantity';
    unitPrice: 'unitPrice';
    aiNotes: 'aiNotes';
  };

  export type OrderItemScalarFieldEnum =
    (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];

  export const N8nChatHistoryScalarFieldEnum: {
    id: 'id';
    sessionId: 'sessionId';
    message: 'message';
  };

  export type N8nChatHistoryScalarFieldEnum =
    (typeof N8nChatHistoryScalarFieldEnum)[keyof typeof N8nChatHistoryScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull;
  };

  export type JsonNullValueInput =
    (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter =
    (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int'
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int[]'
  >;

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String'
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String[]'
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Boolean'
  >;

  /**
   * Reference to a field of type 'TableStatus'
   */
  export type EnumTableStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'TableStatus'
  >;

  /**
   * Reference to a field of type 'TableStatus[]'
   */
  export type ListEnumTableStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'TableStatus[]'>;

  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Decimal'
  >;

  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Decimal[]'
  >;

  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'PaymentStatus'
  >;

  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>;

  /**
   * Reference to a field of type 'KitchenStatus'
   */
  export type EnumKitchenStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'KitchenStatus'
  >;

  /**
   * Reference to a field of type 'KitchenStatus[]'
   */
  export type ListEnumKitchenStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'KitchenStatus[]'>;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime'
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Json'
  >;

  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'QueryMode'
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float'
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float[]'
  >;

  /**
   * Deep Input Types
   */

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[];
    OR?: CategoryWhereInput[];
    NOT?: CategoryWhereInput | CategoryWhereInput[];
    id?: IntFilter<'Category'> | number;
    name?: StringFilter<'Category'> | string;
    isActive?: BoolFilter<'Category'> | boolean;
    products?: ProductListRelationFilter;
  };

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    isActive?: SortOrder;
    products?: ProductOrderByRelationAggregateInput;
  };

  export type CategoryWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: CategoryWhereInput | CategoryWhereInput[];
      OR?: CategoryWhereInput[];
      NOT?: CategoryWhereInput | CategoryWhereInput[];
      name?: StringFilter<'Category'> | string;
      isActive?: BoolFilter<'Category'> | boolean;
      products?: ProductListRelationFilter;
    },
    'id'
  >;

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    isActive?: SortOrder;
    _count?: CategoryCountOrderByAggregateInput;
    _avg?: CategoryAvgOrderByAggregateInput;
    _max?: CategoryMaxOrderByAggregateInput;
    _min?: CategoryMinOrderByAggregateInput;
    _sum?: CategorySumOrderByAggregateInput;
  };

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?:
      | CategoryScalarWhereWithAggregatesInput
      | CategoryScalarWhereWithAggregatesInput[];
    OR?: CategoryScalarWhereWithAggregatesInput[];
    NOT?:
      | CategoryScalarWhereWithAggregatesInput
      | CategoryScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Category'> | number;
    name?: StringWithAggregatesFilter<'Category'> | string;
    isActive?: BoolWithAggregatesFilter<'Category'> | boolean;
  };

  export type TableWhereInput = {
    AND?: TableWhereInput | TableWhereInput[];
    OR?: TableWhereInput[];
    NOT?: TableWhereInput | TableWhereInput[];
    id?: IntFilter<'Table'> | number;
    tableName?: StringFilter<'Table'> | string;
    status?: EnumTableStatusFilter<'Table'> | $Enums.TableStatus;
    orders?: OrderListRelationFilter;
  };

  export type TableOrderByWithRelationInput = {
    id?: SortOrder;
    tableName?: SortOrder;
    status?: SortOrder;
    orders?: OrderOrderByRelationAggregateInput;
  };

  export type TableWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: TableWhereInput | TableWhereInput[];
      OR?: TableWhereInput[];
      NOT?: TableWhereInput | TableWhereInput[];
      tableName?: StringFilter<'Table'> | string;
      status?: EnumTableStatusFilter<'Table'> | $Enums.TableStatus;
      orders?: OrderListRelationFilter;
    },
    'id'
  >;

  export type TableOrderByWithAggregationInput = {
    id?: SortOrder;
    tableName?: SortOrder;
    status?: SortOrder;
    _count?: TableCountOrderByAggregateInput;
    _avg?: TableAvgOrderByAggregateInput;
    _max?: TableMaxOrderByAggregateInput;
    _min?: TableMinOrderByAggregateInput;
    _sum?: TableSumOrderByAggregateInput;
  };

  export type TableScalarWhereWithAggregatesInput = {
    AND?:
      | TableScalarWhereWithAggregatesInput
      | TableScalarWhereWithAggregatesInput[];
    OR?: TableScalarWhereWithAggregatesInput[];
    NOT?:
      | TableScalarWhereWithAggregatesInput
      | TableScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Table'> | number;
    tableName?: StringWithAggregatesFilter<'Table'> | string;
    status?: EnumTableStatusWithAggregatesFilter<'Table'> | $Enums.TableStatus;
  };

  export type IngredientWhereInput = {
    AND?: IngredientWhereInput | IngredientWhereInput[];
    OR?: IngredientWhereInput[];
    NOT?: IngredientWhereInput | IngredientWhereInput[];
    id?: IntFilter<'Ingredient'> | number;
    name?: StringFilter<'Ingredient'> | string;
    isAllergen?: BoolFilter<'Ingredient'> | boolean;
    productIngredients?: ProductIngredientListRelationFilter;
  };

  export type IngredientOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    isAllergen?: SortOrder;
    productIngredients?: ProductIngredientOrderByRelationAggregateInput;
  };

  export type IngredientWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: IngredientWhereInput | IngredientWhereInput[];
      OR?: IngredientWhereInput[];
      NOT?: IngredientWhereInput | IngredientWhereInput[];
      name?: StringFilter<'Ingredient'> | string;
      isAllergen?: BoolFilter<'Ingredient'> | boolean;
      productIngredients?: ProductIngredientListRelationFilter;
    },
    'id'
  >;

  export type IngredientOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    isAllergen?: SortOrder;
    _count?: IngredientCountOrderByAggregateInput;
    _avg?: IngredientAvgOrderByAggregateInput;
    _max?: IngredientMaxOrderByAggregateInput;
    _min?: IngredientMinOrderByAggregateInput;
    _sum?: IngredientSumOrderByAggregateInput;
  };

  export type IngredientScalarWhereWithAggregatesInput = {
    AND?:
      | IngredientScalarWhereWithAggregatesInput
      | IngredientScalarWhereWithAggregatesInput[];
    OR?: IngredientScalarWhereWithAggregatesInput[];
    NOT?:
      | IngredientScalarWhereWithAggregatesInput
      | IngredientScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Ingredient'> | number;
    name?: StringWithAggregatesFilter<'Ingredient'> | string;
    isAllergen?: BoolWithAggregatesFilter<'Ingredient'> | boolean;
  };

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[];
    OR?: ProductWhereInput[];
    NOT?: ProductWhereInput | ProductWhereInput[];
    id?: IntFilter<'Product'> | number;
    legacyId?: IntNullableFilter<'Product'> | number | null;
    categoryId?: IntFilter<'Product'> | number;
    name?: StringFilter<'Product'> | string;
    aiDescription?: StringNullableFilter<'Product'> | string | null;
    price?:
      | DecimalFilter<'Product'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolFilter<'Product'> | boolean;
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>;
    productIngredients?: ProductIngredientListRelationFilter;
    orderItems?: OrderItemListRelationFilter;
  };

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder;
    legacyId?: SortOrderInput | SortOrder;
    categoryId?: SortOrder;
    name?: SortOrder;
    aiDescription?: SortOrderInput | SortOrder;
    price?: SortOrder;
    isAvailable?: SortOrder;
    category?: CategoryOrderByWithRelationInput;
    productIngredients?: ProductIngredientOrderByRelationAggregateInput;
    orderItems?: OrderItemOrderByRelationAggregateInput;
  };

  export type ProductWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: ProductWhereInput | ProductWhereInput[];
      OR?: ProductWhereInput[];
      NOT?: ProductWhereInput | ProductWhereInput[];
      legacyId?: IntNullableFilter<'Product'> | number | null;
      categoryId?: IntFilter<'Product'> | number;
      name?: StringFilter<'Product'> | string;
      aiDescription?: StringNullableFilter<'Product'> | string | null;
      price?:
        | DecimalFilter<'Product'>
        | Decimal
        | DecimalJsLike
        | number
        | string;
      isAvailable?: BoolFilter<'Product'> | boolean;
      category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>;
      productIngredients?: ProductIngredientListRelationFilter;
      orderItems?: OrderItemListRelationFilter;
    },
    'id'
  >;

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder;
    legacyId?: SortOrderInput | SortOrder;
    categoryId?: SortOrder;
    name?: SortOrder;
    aiDescription?: SortOrderInput | SortOrder;
    price?: SortOrder;
    isAvailable?: SortOrder;
    _count?: ProductCountOrderByAggregateInput;
    _avg?: ProductAvgOrderByAggregateInput;
    _max?: ProductMaxOrderByAggregateInput;
    _min?: ProductMinOrderByAggregateInput;
    _sum?: ProductSumOrderByAggregateInput;
  };

  export type ProductScalarWhereWithAggregatesInput = {
    AND?:
      | ProductScalarWhereWithAggregatesInput
      | ProductScalarWhereWithAggregatesInput[];
    OR?: ProductScalarWhereWithAggregatesInput[];
    NOT?:
      | ProductScalarWhereWithAggregatesInput
      | ProductScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Product'> | number;
    legacyId?: IntNullableWithAggregatesFilter<'Product'> | number | null;
    categoryId?: IntWithAggregatesFilter<'Product'> | number;
    name?: StringWithAggregatesFilter<'Product'> | string;
    aiDescription?:
      | StringNullableWithAggregatesFilter<'Product'>
      | string
      | null;
    price?:
      | DecimalWithAggregatesFilter<'Product'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolWithAggregatesFilter<'Product'> | boolean;
  };

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[];
    OR?: OrderWhereInput[];
    NOT?: OrderWhereInput | OrderWhereInput[];
    id?: IntFilter<'Order'> | number;
    tableId?: IntFilter<'Order'> | number;
    chatSessionId?: UuidNullableFilter<'Order'> | string | null;
    paymentCode?: StringNullableFilter<'Order'> | string | null;
    total?:
      | DecimalNullableFilter<'Order'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    paymentStatus?: EnumPaymentStatusFilter<'Order'> | $Enums.PaymentStatus;
    kitchenStatus?: EnumKitchenStatusFilter<'Order'> | $Enums.KitchenStatus;
    createdAt?: DateTimeFilter<'Order'> | Date | string;
    deletedAt?: DateTimeNullableFilter<'Order'> | Date | string | null;
    table?: XOR<TableScalarRelationFilter, TableWhereInput>;
    orderItems?: OrderItemListRelationFilter;
  };

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder;
    tableId?: SortOrder;
    chatSessionId?: SortOrderInput | SortOrder;
    paymentCode?: SortOrderInput | SortOrder;
    total?: SortOrderInput | SortOrder;
    paymentStatus?: SortOrder;
    kitchenStatus?: SortOrder;
    createdAt?: SortOrder;
    deletedAt?: SortOrderInput | SortOrder;
    table?: TableOrderByWithRelationInput;
    orderItems?: OrderItemOrderByRelationAggregateInput;
  };

  export type OrderWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: OrderWhereInput | OrderWhereInput[];
      OR?: OrderWhereInput[];
      NOT?: OrderWhereInput | OrderWhereInput[];
      tableId?: IntFilter<'Order'> | number;
      chatSessionId?: UuidNullableFilter<'Order'> | string | null;
      paymentCode?: StringNullableFilter<'Order'> | string | null;
      total?:
        | DecimalNullableFilter<'Order'>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      paymentStatus?: EnumPaymentStatusFilter<'Order'> | $Enums.PaymentStatus;
      kitchenStatus?: EnumKitchenStatusFilter<'Order'> | $Enums.KitchenStatus;
      createdAt?: DateTimeFilter<'Order'> | Date | string;
      deletedAt?: DateTimeNullableFilter<'Order'> | Date | string | null;
      table?: XOR<TableScalarRelationFilter, TableWhereInput>;
      orderItems?: OrderItemListRelationFilter;
    },
    'id'
  >;

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder;
    tableId?: SortOrder;
    chatSessionId?: SortOrderInput | SortOrder;
    paymentCode?: SortOrderInput | SortOrder;
    total?: SortOrderInput | SortOrder;
    paymentStatus?: SortOrder;
    kitchenStatus?: SortOrder;
    createdAt?: SortOrder;
    deletedAt?: SortOrderInput | SortOrder;
    _count?: OrderCountOrderByAggregateInput;
    _avg?: OrderAvgOrderByAggregateInput;
    _max?: OrderMaxOrderByAggregateInput;
    _min?: OrderMinOrderByAggregateInput;
    _sum?: OrderSumOrderByAggregateInput;
  };

  export type OrderScalarWhereWithAggregatesInput = {
    AND?:
      | OrderScalarWhereWithAggregatesInput
      | OrderScalarWhereWithAggregatesInput[];
    OR?: OrderScalarWhereWithAggregatesInput[];
    NOT?:
      | OrderScalarWhereWithAggregatesInput
      | OrderScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Order'> | number;
    tableId?: IntWithAggregatesFilter<'Order'> | number;
    chatSessionId?: UuidNullableWithAggregatesFilter<'Order'> | string | null;
    paymentCode?: StringNullableWithAggregatesFilter<'Order'> | string | null;
    total?:
      | DecimalNullableWithAggregatesFilter<'Order'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    paymentStatus?:
      | EnumPaymentStatusWithAggregatesFilter<'Order'>
      | $Enums.PaymentStatus;
    kitchenStatus?:
      | EnumKitchenStatusWithAggregatesFilter<'Order'>
      | $Enums.KitchenStatus;
    createdAt?: DateTimeWithAggregatesFilter<'Order'> | Date | string;
    deletedAt?:
      | DateTimeNullableWithAggregatesFilter<'Order'>
      | Date
      | string
      | null;
  };

  export type ProductIngredientWhereInput = {
    AND?: ProductIngredientWhereInput | ProductIngredientWhereInput[];
    OR?: ProductIngredientWhereInput[];
    NOT?: ProductIngredientWhereInput | ProductIngredientWhereInput[];
    productId?: IntFilter<'ProductIngredient'> | number;
    ingredientId?: IntFilter<'ProductIngredient'> | number;
    isOptional?: BoolFilter<'ProductIngredient'> | boolean;
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>;
    ingredient?: XOR<IngredientScalarRelationFilter, IngredientWhereInput>;
  };

  export type ProductIngredientOrderByWithRelationInput = {
    productId?: SortOrder;
    ingredientId?: SortOrder;
    isOptional?: SortOrder;
    product?: ProductOrderByWithRelationInput;
    ingredient?: IngredientOrderByWithRelationInput;
  };

  export type ProductIngredientWhereUniqueInput = Prisma.AtLeast<
    {
      productId_ingredientId?: ProductIngredientProductIdIngredientIdCompoundUniqueInput;
      AND?: ProductIngredientWhereInput | ProductIngredientWhereInput[];
      OR?: ProductIngredientWhereInput[];
      NOT?: ProductIngredientWhereInput | ProductIngredientWhereInput[];
      productId?: IntFilter<'ProductIngredient'> | number;
      ingredientId?: IntFilter<'ProductIngredient'> | number;
      isOptional?: BoolFilter<'ProductIngredient'> | boolean;
      product?: XOR<ProductScalarRelationFilter, ProductWhereInput>;
      ingredient?: XOR<IngredientScalarRelationFilter, IngredientWhereInput>;
    },
    'productId_ingredientId'
  >;

  export type ProductIngredientOrderByWithAggregationInput = {
    productId?: SortOrder;
    ingredientId?: SortOrder;
    isOptional?: SortOrder;
    _count?: ProductIngredientCountOrderByAggregateInput;
    _avg?: ProductIngredientAvgOrderByAggregateInput;
    _max?: ProductIngredientMaxOrderByAggregateInput;
    _min?: ProductIngredientMinOrderByAggregateInput;
    _sum?: ProductIngredientSumOrderByAggregateInput;
  };

  export type ProductIngredientScalarWhereWithAggregatesInput = {
    AND?:
      | ProductIngredientScalarWhereWithAggregatesInput
      | ProductIngredientScalarWhereWithAggregatesInput[];
    OR?: ProductIngredientScalarWhereWithAggregatesInput[];
    NOT?:
      | ProductIngredientScalarWhereWithAggregatesInput
      | ProductIngredientScalarWhereWithAggregatesInput[];
    productId?: IntWithAggregatesFilter<'ProductIngredient'> | number;
    ingredientId?: IntWithAggregatesFilter<'ProductIngredient'> | number;
    isOptional?: BoolWithAggregatesFilter<'ProductIngredient'> | boolean;
  };

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[];
    OR?: OrderItemWhereInput[];
    NOT?: OrderItemWhereInput | OrderItemWhereInput[];
    id?: IntFilter<'OrderItem'> | number;
    orderId?: IntFilter<'OrderItem'> | number;
    productId?: IntFilter<'OrderItem'> | number;
    quantity?: IntFilter<'OrderItem'> | number;
    unitPrice?:
      | DecimalFilter<'OrderItem'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aiNotes?: StringNullableFilter<'OrderItem'> | string | null;
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>;
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>;
  };

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    aiNotes?: SortOrderInput | SortOrder;
    order?: OrderOrderByWithRelationInput;
    product?: ProductOrderByWithRelationInput;
  };

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: OrderItemWhereInput | OrderItemWhereInput[];
      OR?: OrderItemWhereInput[];
      NOT?: OrderItemWhereInput | OrderItemWhereInput[];
      orderId?: IntFilter<'OrderItem'> | number;
      productId?: IntFilter<'OrderItem'> | number;
      quantity?: IntFilter<'OrderItem'> | number;
      unitPrice?:
        | DecimalFilter<'OrderItem'>
        | Decimal
        | DecimalJsLike
        | number
        | string;
      aiNotes?: StringNullableFilter<'OrderItem'> | string | null;
      order?: XOR<OrderScalarRelationFilter, OrderWhereInput>;
      product?: XOR<ProductScalarRelationFilter, ProductWhereInput>;
    },
    'id'
  >;

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    aiNotes?: SortOrderInput | SortOrder;
    _count?: OrderItemCountOrderByAggregateInput;
    _avg?: OrderItemAvgOrderByAggregateInput;
    _max?: OrderItemMaxOrderByAggregateInput;
    _min?: OrderItemMinOrderByAggregateInput;
    _sum?: OrderItemSumOrderByAggregateInput;
  };

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?:
      | OrderItemScalarWhereWithAggregatesInput
      | OrderItemScalarWhereWithAggregatesInput[];
    OR?: OrderItemScalarWhereWithAggregatesInput[];
    NOT?:
      | OrderItemScalarWhereWithAggregatesInput
      | OrderItemScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'OrderItem'> | number;
    orderId?: IntWithAggregatesFilter<'OrderItem'> | number;
    productId?: IntWithAggregatesFilter<'OrderItem'> | number;
    quantity?: IntWithAggregatesFilter<'OrderItem'> | number;
    unitPrice?:
      | DecimalWithAggregatesFilter<'OrderItem'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aiNotes?: StringNullableWithAggregatesFilter<'OrderItem'> | string | null;
  };

  export type N8nChatHistoryWhereInput = {
    AND?: N8nChatHistoryWhereInput | N8nChatHistoryWhereInput[];
    OR?: N8nChatHistoryWhereInput[];
    NOT?: N8nChatHistoryWhereInput | N8nChatHistoryWhereInput[];
    id?: IntFilter<'N8nChatHistory'> | number;
    sessionId?: StringFilter<'N8nChatHistory'> | string;
    message?: JsonFilter<'N8nChatHistory'>;
  };

  export type N8nChatHistoryOrderByWithRelationInput = {
    id?: SortOrder;
    sessionId?: SortOrder;
    message?: SortOrder;
  };

  export type N8nChatHistoryWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: N8nChatHistoryWhereInput | N8nChatHistoryWhereInput[];
      OR?: N8nChatHistoryWhereInput[];
      NOT?: N8nChatHistoryWhereInput | N8nChatHistoryWhereInput[];
      sessionId?: StringFilter<'N8nChatHistory'> | string;
      message?: JsonFilter<'N8nChatHistory'>;
    },
    'id'
  >;

  export type N8nChatHistoryOrderByWithAggregationInput = {
    id?: SortOrder;
    sessionId?: SortOrder;
    message?: SortOrder;
    _count?: N8nChatHistoryCountOrderByAggregateInput;
    _avg?: N8nChatHistoryAvgOrderByAggregateInput;
    _max?: N8nChatHistoryMaxOrderByAggregateInput;
    _min?: N8nChatHistoryMinOrderByAggregateInput;
    _sum?: N8nChatHistorySumOrderByAggregateInput;
  };

  export type N8nChatHistoryScalarWhereWithAggregatesInput = {
    AND?:
      | N8nChatHistoryScalarWhereWithAggregatesInput
      | N8nChatHistoryScalarWhereWithAggregatesInput[];
    OR?: N8nChatHistoryScalarWhereWithAggregatesInput[];
    NOT?:
      | N8nChatHistoryScalarWhereWithAggregatesInput
      | N8nChatHistoryScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'N8nChatHistory'> | number;
    sessionId?: StringWithAggregatesFilter<'N8nChatHistory'> | string;
    message?: JsonWithAggregatesFilter<'N8nChatHistory'>;
  };

  export type CategoryCreateInput = {
    name: string;
    isActive?: boolean;
    products?: ProductCreateNestedManyWithoutCategoryInput;
  };

  export type CategoryUncheckedCreateInput = {
    id?: number;
    name: string;
    isActive?: boolean;
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput;
  };

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    products?: ProductUpdateManyWithoutCategoryNestedInput;
  };

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput;
  };

  export type CategoryCreateManyInput = {
    id?: number;
    name: string;
    isActive?: boolean;
  };

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type TableCreateInput = {
    tableName: string;
    status?: $Enums.TableStatus;
    orders?: OrderCreateNestedManyWithoutTableInput;
  };

  export type TableUncheckedCreateInput = {
    id?: number;
    tableName: string;
    status?: $Enums.TableStatus;
    orders?: OrderUncheckedCreateNestedManyWithoutTableInput;
  };

  export type TableUpdateInput = {
    tableName?: StringFieldUpdateOperationsInput | string;
    status?: EnumTableStatusFieldUpdateOperationsInput | $Enums.TableStatus;
    orders?: OrderUpdateManyWithoutTableNestedInput;
  };

  export type TableUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    tableName?: StringFieldUpdateOperationsInput | string;
    status?: EnumTableStatusFieldUpdateOperationsInput | $Enums.TableStatus;
    orders?: OrderUncheckedUpdateManyWithoutTableNestedInput;
  };

  export type TableCreateManyInput = {
    id?: number;
    tableName: string;
    status?: $Enums.TableStatus;
  };

  export type TableUpdateManyMutationInput = {
    tableName?: StringFieldUpdateOperationsInput | string;
    status?: EnumTableStatusFieldUpdateOperationsInput | $Enums.TableStatus;
  };

  export type TableUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    tableName?: StringFieldUpdateOperationsInput | string;
    status?: EnumTableStatusFieldUpdateOperationsInput | $Enums.TableStatus;
  };

  export type IngredientCreateInput = {
    name: string;
    isAllergen?: boolean;
    productIngredients?: ProductIngredientCreateNestedManyWithoutIngredientInput;
  };

  export type IngredientUncheckedCreateInput = {
    id?: number;
    name: string;
    isAllergen?: boolean;
    productIngredients?: ProductIngredientUncheckedCreateNestedManyWithoutIngredientInput;
  };

  export type IngredientUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    isAllergen?: BoolFieldUpdateOperationsInput | boolean;
    productIngredients?: ProductIngredientUpdateManyWithoutIngredientNestedInput;
  };

  export type IngredientUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    isAllergen?: BoolFieldUpdateOperationsInput | boolean;
    productIngredients?: ProductIngredientUncheckedUpdateManyWithoutIngredientNestedInput;
  };

  export type IngredientCreateManyInput = {
    id?: number;
    name: string;
    isAllergen?: boolean;
  };

  export type IngredientUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
    isAllergen?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type IngredientUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    isAllergen?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ProductCreateInput = {
    legacyId?: number | null;
    name: string;
    aiDescription?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    isAvailable?: boolean;
    category: CategoryCreateNestedOneWithoutProductsInput;
    productIngredients?: ProductIngredientCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateInput = {
    id?: number;
    legacyId?: number | null;
    categoryId: number;
    name: string;
    aiDescription?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    isAvailable?: boolean;
    productIngredients?: ProductIngredientUncheckedCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductUpdateInput = {
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null;
    name?: StringFieldUpdateOperationsInput | string;
    aiDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolFieldUpdateOperationsInput | boolean;
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput;
    productIngredients?: ProductIngredientUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null;
    categoryId?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    aiDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolFieldUpdateOperationsInput | boolean;
    productIngredients?: ProductIngredientUncheckedUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type ProductCreateManyInput = {
    id?: number;
    legacyId?: number | null;
    categoryId: number;
    name: string;
    aiDescription?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    isAvailable?: boolean;
  };

  export type ProductUpdateManyMutationInput = {
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null;
    name?: StringFieldUpdateOperationsInput | string;
    aiDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null;
    categoryId?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    aiDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type OrderCreateInput = {
    chatSessionId?: string | null;
    paymentCode?: string | null;
    total?: Decimal | DecimalJsLike | number | string | null;
    paymentStatus?: $Enums.PaymentStatus;
    kitchenStatus?: $Enums.KitchenStatus;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
    table: TableCreateNestedOneWithoutOrdersInput;
    orderItems?: OrderItemCreateNestedManyWithoutOrderInput;
  };

  export type OrderUncheckedCreateInput = {
    id?: number;
    tableId: number;
    chatSessionId?: string | null;
    paymentCode?: string | null;
    total?: Decimal | DecimalJsLike | number | string | null;
    paymentStatus?: $Enums.PaymentStatus;
    kitchenStatus?: $Enums.KitchenStatus;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderUpdateInput = {
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentCode?: NullableStringFieldUpdateOperationsInput | string | null;
    total?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    kitchenStatus?:
      | EnumKitchenStatusFieldUpdateOperationsInput
      | $Enums.KitchenStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    table?: TableUpdateOneRequiredWithoutOrdersNestedInput;
    orderItems?: OrderItemUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    tableId?: IntFieldUpdateOperationsInput | number;
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentCode?: NullableStringFieldUpdateOperationsInput | string | null;
    total?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    kitchenStatus?:
      | EnumKitchenStatusFieldUpdateOperationsInput
      | $Enums.KitchenStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    orderItems?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderCreateManyInput = {
    id?: number;
    tableId: number;
    chatSessionId?: string | null;
    paymentCode?: string | null;
    total?: Decimal | DecimalJsLike | number | string | null;
    paymentStatus?: $Enums.PaymentStatus;
    kitchenStatus?: $Enums.KitchenStatus;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
  };

  export type OrderUpdateManyMutationInput = {
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentCode?: NullableStringFieldUpdateOperationsInput | string | null;
    total?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    kitchenStatus?:
      | EnumKitchenStatusFieldUpdateOperationsInput
      | $Enums.KitchenStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type OrderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    tableId?: IntFieldUpdateOperationsInput | number;
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentCode?: NullableStringFieldUpdateOperationsInput | string | null;
    total?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    kitchenStatus?:
      | EnumKitchenStatusFieldUpdateOperationsInput
      | $Enums.KitchenStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ProductIngredientCreateInput = {
    isOptional?: boolean;
    product: ProductCreateNestedOneWithoutProductIngredientsInput;
    ingredient: IngredientCreateNestedOneWithoutProductIngredientsInput;
  };

  export type ProductIngredientUncheckedCreateInput = {
    productId: number;
    ingredientId: number;
    isOptional?: boolean;
  };

  export type ProductIngredientUpdateInput = {
    isOptional?: BoolFieldUpdateOperationsInput | boolean;
    product?: ProductUpdateOneRequiredWithoutProductIngredientsNestedInput;
    ingredient?: IngredientUpdateOneRequiredWithoutProductIngredientsNestedInput;
  };

  export type ProductIngredientUncheckedUpdateInput = {
    productId?: IntFieldUpdateOperationsInput | number;
    ingredientId?: IntFieldUpdateOperationsInput | number;
    isOptional?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ProductIngredientCreateManyInput = {
    productId: number;
    ingredientId: number;
    isOptional?: boolean;
  };

  export type ProductIngredientUpdateManyMutationInput = {
    isOptional?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ProductIngredientUncheckedUpdateManyInput = {
    productId?: IntFieldUpdateOperationsInput | number;
    ingredientId?: IntFieldUpdateOperationsInput | number;
    isOptional?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type OrderItemCreateInput = {
    quantity?: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    aiNotes?: string | null;
    order: OrderCreateNestedOneWithoutOrderItemsInput;
    product: ProductCreateNestedOneWithoutOrderItemsInput;
  };

  export type OrderItemUncheckedCreateInput = {
    id?: number;
    orderId: number;
    productId: number;
    quantity?: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    aiNotes?: string | null;
  };

  export type OrderItemUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aiNotes?: NullableStringFieldUpdateOperationsInput | string | null;
    order?: OrderUpdateOneRequiredWithoutOrderItemsNestedInput;
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput;
  };

  export type OrderItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    orderId?: IntFieldUpdateOperationsInput | number;
    productId?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aiNotes?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type OrderItemCreateManyInput = {
    id?: number;
    orderId: number;
    productId: number;
    quantity?: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    aiNotes?: string | null;
  };

  export type OrderItemUpdateManyMutationInput = {
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aiNotes?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type OrderItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    orderId?: IntFieldUpdateOperationsInput | number;
    productId?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aiNotes?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type N8nChatHistoryCreateInput = {
    sessionId: string;
    message: JsonNullValueInput | InputJsonValue;
  };

  export type N8nChatHistoryUncheckedCreateInput = {
    id?: number;
    sessionId: string;
    message: JsonNullValueInput | InputJsonValue;
  };

  export type N8nChatHistoryUpdateInput = {
    sessionId?: StringFieldUpdateOperationsInput | string;
    message?: JsonNullValueInput | InputJsonValue;
  };

  export type N8nChatHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    sessionId?: StringFieldUpdateOperationsInput | string;
    message?: JsonNullValueInput | InputJsonValue;
  };

  export type N8nChatHistoryCreateManyInput = {
    id?: number;
    sessionId: string;
    message: JsonNullValueInput | InputJsonValue;
  };

  export type N8nChatHistoryUpdateManyMutationInput = {
    sessionId?: StringFieldUpdateOperationsInput | string;
    message?: JsonNullValueInput | InputJsonValue;
  };

  export type N8nChatHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    sessionId?: StringFieldUpdateOperationsInput | string;
    message?: JsonNullValueInput | InputJsonValue;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type ProductListRelationFilter = {
    every?: ProductWhereInput;
    some?: ProductWhereInput;
    none?: ProductWhereInput;
  };

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    isActive?: SortOrder;
  };

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    isActive?: SortOrder;
  };

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    isActive?: SortOrder;
  };

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type EnumTableStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TableStatus | EnumTableStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TableStatus[] | ListEnumTableStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.TableStatus[]
      | ListEnumTableStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumTableStatusFilter<$PrismaModel> | $Enums.TableStatus;
  };

  export type OrderListRelationFilter = {
    every?: OrderWhereInput;
    some?: OrderWhereInput;
    none?: OrderWhereInput;
  };

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type TableCountOrderByAggregateInput = {
    id?: SortOrder;
    tableName?: SortOrder;
    status?: SortOrder;
  };

  export type TableAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type TableMaxOrderByAggregateInput = {
    id?: SortOrder;
    tableName?: SortOrder;
    status?: SortOrder;
  };

  export type TableMinOrderByAggregateInput = {
    id?: SortOrder;
    tableName?: SortOrder;
    status?: SortOrder;
  };

  export type TableSumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type EnumTableStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TableStatus | EnumTableStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TableStatus[] | ListEnumTableStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.TableStatus[]
      | ListEnumTableStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumTableStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.TableStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumTableStatusFilter<$PrismaModel>;
    _max?: NestedEnumTableStatusFilter<$PrismaModel>;
  };

  export type ProductIngredientListRelationFilter = {
    every?: ProductIngredientWhereInput;
    some?: ProductIngredientWhereInput;
    none?: ProductIngredientWhereInput;
  };

  export type ProductIngredientOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type IngredientCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    isAllergen?: SortOrder;
  };

  export type IngredientAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type IngredientMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    isAllergen?: SortOrder;
  };

  export type IngredientMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    isAllergen?: SortOrder;
  };

  export type IngredientSumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DecimalFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput;
    isNot?: CategoryWhereInput;
  };

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput;
    some?: OrderItemWhereInput;
    none?: OrderItemWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder;
    legacyId?: SortOrder;
    categoryId?: SortOrder;
    name?: SortOrder;
    aiDescription?: SortOrder;
    price?: SortOrder;
    isAvailable?: SortOrder;
  };

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder;
    legacyId?: SortOrder;
    categoryId?: SortOrder;
    price?: SortOrder;
  };

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder;
    legacyId?: SortOrder;
    categoryId?: SortOrder;
    name?: SortOrder;
    aiDescription?: SortOrder;
    price?: SortOrder;
    isAvailable?: SortOrder;
  };

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder;
    legacyId?: SortOrder;
    categoryId?: SortOrder;
    name?: SortOrder;
    aiDescription?: SortOrder;
    price?: SortOrder;
    isAvailable?: SortOrder;
  };

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder;
    legacyId?: SortOrder;
    categoryId?: SortOrder;
    price?: SortOrder;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedDecimalFilter<$PrismaModel>;
    _sum?: NestedDecimalFilter<$PrismaModel>;
    _min?: NestedDecimalFilter<$PrismaModel>;
    _max?: NestedDecimalFilter<$PrismaModel>;
  };

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null;
  };

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>
      | null;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalNullableFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
  };

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.PaymentStatus
      | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
  };

  export type EnumKitchenStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.KitchenStatus
      | EnumKitchenStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.KitchenStatus[]
      | ListEnumKitchenStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.KitchenStatus[]
      | ListEnumKitchenStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumKitchenStatusFilter<$PrismaModel> | $Enums.KitchenStatus;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type TableScalarRelationFilter = {
    is?: TableWhereInput;
    isNot?: TableWhereInput;
  };

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder;
    tableId?: SortOrder;
    chatSessionId?: SortOrder;
    paymentCode?: SortOrder;
    total?: SortOrder;
    paymentStatus?: SortOrder;
    kitchenStatus?: SortOrder;
    createdAt?: SortOrder;
    deletedAt?: SortOrder;
  };

  export type OrderAvgOrderByAggregateInput = {
    id?: SortOrder;
    tableId?: SortOrder;
    total?: SortOrder;
  };

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder;
    tableId?: SortOrder;
    chatSessionId?: SortOrder;
    paymentCode?: SortOrder;
    total?: SortOrder;
    paymentStatus?: SortOrder;
    kitchenStatus?: SortOrder;
    createdAt?: SortOrder;
    deletedAt?: SortOrder;
  };

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder;
    tableId?: SortOrder;
    chatSessionId?: SortOrder;
    paymentCode?: SortOrder;
    total?: SortOrder;
    paymentStatus?: SortOrder;
    kitchenStatus?: SortOrder;
    createdAt?: SortOrder;
    deletedAt?: SortOrder;
  };

  export type OrderSumOrderByAggregateInput = {
    id?: SortOrder;
    tableId?: SortOrder;
    total?: SortOrder;
  };

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>
      | null;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalNullableWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: NestedDecimalNullableFilter<$PrismaModel>;
    _min?: NestedDecimalNullableFilter<$PrismaModel>;
    _max?: NestedDecimalNullableFilter<$PrismaModel>;
  };

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.PaymentStatus
      | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.PaymentStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>;
  };

  export type EnumKitchenStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.KitchenStatus
      | EnumKitchenStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.KitchenStatus[]
      | ListEnumKitchenStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.KitchenStatus[]
      | ListEnumKitchenStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumKitchenStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.KitchenStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumKitchenStatusFilter<$PrismaModel>;
    _max?: NestedEnumKitchenStatusFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput;
    isNot?: ProductWhereInput;
  };

  export type IngredientScalarRelationFilter = {
    is?: IngredientWhereInput;
    isNot?: IngredientWhereInput;
  };

  export type ProductIngredientProductIdIngredientIdCompoundUniqueInput = {
    productId: number;
    ingredientId: number;
  };

  export type ProductIngredientCountOrderByAggregateInput = {
    productId?: SortOrder;
    ingredientId?: SortOrder;
    isOptional?: SortOrder;
  };

  export type ProductIngredientAvgOrderByAggregateInput = {
    productId?: SortOrder;
    ingredientId?: SortOrder;
  };

  export type ProductIngredientMaxOrderByAggregateInput = {
    productId?: SortOrder;
    ingredientId?: SortOrder;
    isOptional?: SortOrder;
  };

  export type ProductIngredientMinOrderByAggregateInput = {
    productId?: SortOrder;
    ingredientId?: SortOrder;
    isOptional?: SortOrder;
  };

  export type ProductIngredientSumOrderByAggregateInput = {
    productId?: SortOrder;
    ingredientId?: SortOrder;
  };

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput;
    isNot?: OrderWhereInput;
  };

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    aiNotes?: SortOrder;
  };

  export type OrderItemAvgOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
  };

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    aiNotes?: SortOrder;
  };

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    aiNotes?: SortOrder;
  };

  export type OrderItemSumOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
  };
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type N8nChatHistoryCountOrderByAggregateInput = {
    id?: SortOrder;
    sessionId?: SortOrder;
    message?: SortOrder;
  };

  export type N8nChatHistoryAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type N8nChatHistoryMaxOrderByAggregateInput = {
    id?: SortOrder;
    sessionId?: SortOrder;
  };

  export type N8nChatHistoryMinOrderByAggregateInput = {
    id?: SortOrder;
    sessionId?: SortOrder;
  };

  export type N8nChatHistorySumOrderByAggregateInput = {
    id?: SortOrder;
  };
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
            'path'
          >
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>
      >;

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedJsonFilter<$PrismaModel>;
    _max?: NestedJsonFilter<$PrismaModel>;
  };

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?:
      | XOR<
          ProductCreateWithoutCategoryInput,
          ProductUncheckedCreateWithoutCategoryInput
        >
      | ProductCreateWithoutCategoryInput[]
      | ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutCategoryInput
      | ProductCreateOrConnectWithoutCategoryInput[];
    createMany?: ProductCreateManyCategoryInputEnvelope;
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
  };

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?:
      | XOR<
          ProductCreateWithoutCategoryInput,
          ProductUncheckedCreateWithoutCategoryInput
        >
      | ProductCreateWithoutCategoryInput[]
      | ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutCategoryInput
      | ProductCreateOrConnectWithoutCategoryInput[];
    createMany?: ProductCreateManyCategoryInputEnvelope;
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?:
      | XOR<
          ProductCreateWithoutCategoryInput,
          ProductUncheckedCreateWithoutCategoryInput
        >
      | ProductCreateWithoutCategoryInput[]
      | ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutCategoryInput
      | ProductCreateOrConnectWithoutCategoryInput[];
    upsert?:
      | ProductUpsertWithWhereUniqueWithoutCategoryInput
      | ProductUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: ProductCreateManyCategoryInputEnvelope;
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    update?:
      | ProductUpdateWithWhereUniqueWithoutCategoryInput
      | ProductUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?:
      | ProductUpdateManyWithWhereWithoutCategoryInput
      | ProductUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[];
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?:
      | XOR<
          ProductCreateWithoutCategoryInput,
          ProductUncheckedCreateWithoutCategoryInput
        >
      | ProductCreateWithoutCategoryInput[]
      | ProductUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutCategoryInput
      | ProductCreateOrConnectWithoutCategoryInput[];
    upsert?:
      | ProductUpsertWithWhereUniqueWithoutCategoryInput
      | ProductUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: ProductCreateManyCategoryInputEnvelope;
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    update?:
      | ProductUpdateWithWhereUniqueWithoutCategoryInput
      | ProductUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?:
      | ProductUpdateManyWithWhereWithoutCategoryInput
      | ProductUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[];
  };

  export type OrderCreateNestedManyWithoutTableInput = {
    create?:
      | XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput>
      | OrderCreateWithoutTableInput[]
      | OrderUncheckedCreateWithoutTableInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutTableInput
      | OrderCreateOrConnectWithoutTableInput[];
    createMany?: OrderCreateManyTableInputEnvelope;
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
  };

  export type OrderUncheckedCreateNestedManyWithoutTableInput = {
    create?:
      | XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput>
      | OrderCreateWithoutTableInput[]
      | OrderUncheckedCreateWithoutTableInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutTableInput
      | OrderCreateOrConnectWithoutTableInput[];
    createMany?: OrderCreateManyTableInputEnvelope;
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
  };

  export type EnumTableStatusFieldUpdateOperationsInput = {
    set?: $Enums.TableStatus;
  };

  export type OrderUpdateManyWithoutTableNestedInput = {
    create?:
      | XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput>
      | OrderCreateWithoutTableInput[]
      | OrderUncheckedCreateWithoutTableInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutTableInput
      | OrderCreateOrConnectWithoutTableInput[];
    upsert?:
      | OrderUpsertWithWhereUniqueWithoutTableInput
      | OrderUpsertWithWhereUniqueWithoutTableInput[];
    createMany?: OrderCreateManyTableInputEnvelope;
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    update?:
      | OrderUpdateWithWhereUniqueWithoutTableInput
      | OrderUpdateWithWhereUniqueWithoutTableInput[];
    updateMany?:
      | OrderUpdateManyWithWhereWithoutTableInput
      | OrderUpdateManyWithWhereWithoutTableInput[];
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[];
  };

  export type OrderUncheckedUpdateManyWithoutTableNestedInput = {
    create?:
      | XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput>
      | OrderCreateWithoutTableInput[]
      | OrderUncheckedCreateWithoutTableInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutTableInput
      | OrderCreateOrConnectWithoutTableInput[];
    upsert?:
      | OrderUpsertWithWhereUniqueWithoutTableInput
      | OrderUpsertWithWhereUniqueWithoutTableInput[];
    createMany?: OrderCreateManyTableInputEnvelope;
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    update?:
      | OrderUpdateWithWhereUniqueWithoutTableInput
      | OrderUpdateWithWhereUniqueWithoutTableInput[];
    updateMany?:
      | OrderUpdateManyWithWhereWithoutTableInput
      | OrderUpdateManyWithWhereWithoutTableInput[];
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[];
  };

  export type ProductIngredientCreateNestedManyWithoutIngredientInput = {
    create?:
      | XOR<
          ProductIngredientCreateWithoutIngredientInput,
          ProductIngredientUncheckedCreateWithoutIngredientInput
        >
      | ProductIngredientCreateWithoutIngredientInput[]
      | ProductIngredientUncheckedCreateWithoutIngredientInput[];
    connectOrCreate?:
      | ProductIngredientCreateOrConnectWithoutIngredientInput
      | ProductIngredientCreateOrConnectWithoutIngredientInput[];
    createMany?: ProductIngredientCreateManyIngredientInputEnvelope;
    connect?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
  };

  export type ProductIngredientUncheckedCreateNestedManyWithoutIngredientInput =
    {
      create?:
        | XOR<
            ProductIngredientCreateWithoutIngredientInput,
            ProductIngredientUncheckedCreateWithoutIngredientInput
          >
        | ProductIngredientCreateWithoutIngredientInput[]
        | ProductIngredientUncheckedCreateWithoutIngredientInput[];
      connectOrCreate?:
        | ProductIngredientCreateOrConnectWithoutIngredientInput
        | ProductIngredientCreateOrConnectWithoutIngredientInput[];
      createMany?: ProductIngredientCreateManyIngredientInputEnvelope;
      connect?:
        | ProductIngredientWhereUniqueInput
        | ProductIngredientWhereUniqueInput[];
    };

  export type ProductIngredientUpdateManyWithoutIngredientNestedInput = {
    create?:
      | XOR<
          ProductIngredientCreateWithoutIngredientInput,
          ProductIngredientUncheckedCreateWithoutIngredientInput
        >
      | ProductIngredientCreateWithoutIngredientInput[]
      | ProductIngredientUncheckedCreateWithoutIngredientInput[];
    connectOrCreate?:
      | ProductIngredientCreateOrConnectWithoutIngredientInput
      | ProductIngredientCreateOrConnectWithoutIngredientInput[];
    upsert?:
      | ProductIngredientUpsertWithWhereUniqueWithoutIngredientInput
      | ProductIngredientUpsertWithWhereUniqueWithoutIngredientInput[];
    createMany?: ProductIngredientCreateManyIngredientInputEnvelope;
    set?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
    disconnect?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
    delete?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
    connect?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
    update?:
      | ProductIngredientUpdateWithWhereUniqueWithoutIngredientInput
      | ProductIngredientUpdateWithWhereUniqueWithoutIngredientInput[];
    updateMany?:
      | ProductIngredientUpdateManyWithWhereWithoutIngredientInput
      | ProductIngredientUpdateManyWithWhereWithoutIngredientInput[];
    deleteMany?:
      | ProductIngredientScalarWhereInput
      | ProductIngredientScalarWhereInput[];
  };

  export type ProductIngredientUncheckedUpdateManyWithoutIngredientNestedInput =
    {
      create?:
        | XOR<
            ProductIngredientCreateWithoutIngredientInput,
            ProductIngredientUncheckedCreateWithoutIngredientInput
          >
        | ProductIngredientCreateWithoutIngredientInput[]
        | ProductIngredientUncheckedCreateWithoutIngredientInput[];
      connectOrCreate?:
        | ProductIngredientCreateOrConnectWithoutIngredientInput
        | ProductIngredientCreateOrConnectWithoutIngredientInput[];
      upsert?:
        | ProductIngredientUpsertWithWhereUniqueWithoutIngredientInput
        | ProductIngredientUpsertWithWhereUniqueWithoutIngredientInput[];
      createMany?: ProductIngredientCreateManyIngredientInputEnvelope;
      set?:
        | ProductIngredientWhereUniqueInput
        | ProductIngredientWhereUniqueInput[];
      disconnect?:
        | ProductIngredientWhereUniqueInput
        | ProductIngredientWhereUniqueInput[];
      delete?:
        | ProductIngredientWhereUniqueInput
        | ProductIngredientWhereUniqueInput[];
      connect?:
        | ProductIngredientWhereUniqueInput
        | ProductIngredientWhereUniqueInput[];
      update?:
        | ProductIngredientUpdateWithWhereUniqueWithoutIngredientInput
        | ProductIngredientUpdateWithWhereUniqueWithoutIngredientInput[];
      updateMany?:
        | ProductIngredientUpdateManyWithWhereWithoutIngredientInput
        | ProductIngredientUpdateManyWithWhereWithoutIngredientInput[];
      deleteMany?:
        | ProductIngredientScalarWhereInput
        | ProductIngredientScalarWhereInput[];
    };

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<
      CategoryCreateWithoutProductsInput,
      CategoryUncheckedCreateWithoutProductsInput
    >;
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput;
    connect?: CategoryWhereUniqueInput;
  };

  export type ProductIngredientCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          ProductIngredientCreateWithoutProductInput,
          ProductIngredientUncheckedCreateWithoutProductInput
        >
      | ProductIngredientCreateWithoutProductInput[]
      | ProductIngredientUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductIngredientCreateOrConnectWithoutProductInput
      | ProductIngredientCreateOrConnectWithoutProductInput[];
    createMany?: ProductIngredientCreateManyProductInputEnvelope;
    connect?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
  };

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutProductInput,
          OrderItemUncheckedCreateWithoutProductInput
        >
      | OrderItemCreateWithoutProductInput[]
      | OrderItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutProductInput
      | OrderItemCreateOrConnectWithoutProductInput[];
    createMany?: OrderItemCreateManyProductInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type ProductIngredientUncheckedCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          ProductIngredientCreateWithoutProductInput,
          ProductIngredientUncheckedCreateWithoutProductInput
        >
      | ProductIngredientCreateWithoutProductInput[]
      | ProductIngredientUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductIngredientCreateOrConnectWithoutProductInput
      | ProductIngredientCreateOrConnectWithoutProductInput[];
    createMany?: ProductIngredientCreateManyProductInputEnvelope;
    connect?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
  };

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutProductInput,
          OrderItemUncheckedCreateWithoutProductInput
        >
      | OrderItemCreateWithoutProductInput[]
      | OrderItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutProductInput
      | OrderItemCreateOrConnectWithoutProductInput[];
    createMany?: OrderItemCreateManyProductInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string;
    increment?: Decimal | DecimalJsLike | number | string;
    decrement?: Decimal | DecimalJsLike | number | string;
    multiply?: Decimal | DecimalJsLike | number | string;
    divide?: Decimal | DecimalJsLike | number | string;
  };

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<
      CategoryCreateWithoutProductsInput,
      CategoryUncheckedCreateWithoutProductsInput
    >;
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput;
    upsert?: CategoryUpsertWithoutProductsInput;
    connect?: CategoryWhereUniqueInput;
    update?: XOR<
      XOR<
        CategoryUpdateToOneWithWhereWithoutProductsInput,
        CategoryUpdateWithoutProductsInput
      >,
      CategoryUncheckedUpdateWithoutProductsInput
    >;
  };

  export type ProductIngredientUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          ProductIngredientCreateWithoutProductInput,
          ProductIngredientUncheckedCreateWithoutProductInput
        >
      | ProductIngredientCreateWithoutProductInput[]
      | ProductIngredientUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductIngredientCreateOrConnectWithoutProductInput
      | ProductIngredientCreateOrConnectWithoutProductInput[];
    upsert?:
      | ProductIngredientUpsertWithWhereUniqueWithoutProductInput
      | ProductIngredientUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: ProductIngredientCreateManyProductInputEnvelope;
    set?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
    disconnect?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
    delete?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
    connect?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
    update?:
      | ProductIngredientUpdateWithWhereUniqueWithoutProductInput
      | ProductIngredientUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | ProductIngredientUpdateManyWithWhereWithoutProductInput
      | ProductIngredientUpdateManyWithWhereWithoutProductInput[];
    deleteMany?:
      | ProductIngredientScalarWhereInput
      | ProductIngredientScalarWhereInput[];
  };

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutProductInput,
          OrderItemUncheckedCreateWithoutProductInput
        >
      | OrderItemCreateWithoutProductInput[]
      | OrderItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutProductInput
      | OrderItemCreateOrConnectWithoutProductInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutProductInput
      | OrderItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: OrderItemCreateManyProductInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutProductInput
      | OrderItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutProductInput
      | OrderItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type ProductIngredientUncheckedUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          ProductIngredientCreateWithoutProductInput,
          ProductIngredientUncheckedCreateWithoutProductInput
        >
      | ProductIngredientCreateWithoutProductInput[]
      | ProductIngredientUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductIngredientCreateOrConnectWithoutProductInput
      | ProductIngredientCreateOrConnectWithoutProductInput[];
    upsert?:
      | ProductIngredientUpsertWithWhereUniqueWithoutProductInput
      | ProductIngredientUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: ProductIngredientCreateManyProductInputEnvelope;
    set?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
    disconnect?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
    delete?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
    connect?:
      | ProductIngredientWhereUniqueInput
      | ProductIngredientWhereUniqueInput[];
    update?:
      | ProductIngredientUpdateWithWhereUniqueWithoutProductInput
      | ProductIngredientUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | ProductIngredientUpdateManyWithWhereWithoutProductInput
      | ProductIngredientUpdateManyWithWhereWithoutProductInput[];
    deleteMany?:
      | ProductIngredientScalarWhereInput
      | ProductIngredientScalarWhereInput[];
  };

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutProductInput,
          OrderItemUncheckedCreateWithoutProductInput
        >
      | OrderItemCreateWithoutProductInput[]
      | OrderItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutProductInput
      | OrderItemCreateOrConnectWithoutProductInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutProductInput
      | OrderItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: OrderItemCreateManyProductInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutProductInput
      | OrderItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutProductInput
      | OrderItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type TableCreateNestedOneWithoutOrdersInput = {
    create?: XOR<
      TableCreateWithoutOrdersInput,
      TableUncheckedCreateWithoutOrdersInput
    >;
    connectOrCreate?: TableCreateOrConnectWithoutOrdersInput;
    connect?: TableWhereUniqueInput;
  };

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutOrderInput,
          OrderItemUncheckedCreateWithoutOrderInput
        >
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutOrderInput,
          OrderItemUncheckedCreateWithoutOrderInput
        >
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null;
    increment?: Decimal | DecimalJsLike | number | string;
    decrement?: Decimal | DecimalJsLike | number | string;
    multiply?: Decimal | DecimalJsLike | number | string;
    divide?: Decimal | DecimalJsLike | number | string;
  };

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus;
  };

  export type EnumKitchenStatusFieldUpdateOperationsInput = {
    set?: $Enums.KitchenStatus;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type TableUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<
      TableCreateWithoutOrdersInput,
      TableUncheckedCreateWithoutOrdersInput
    >;
    connectOrCreate?: TableCreateOrConnectWithoutOrdersInput;
    upsert?: TableUpsertWithoutOrdersInput;
    connect?: TableWhereUniqueInput;
    update?: XOR<
      XOR<
        TableUpdateToOneWithWhereWithoutOrdersInput,
        TableUpdateWithoutOrdersInput
      >,
      TableUncheckedUpdateWithoutOrdersInput
    >;
  };

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutOrderInput,
          OrderItemUncheckedCreateWithoutOrderInput
        >
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutOrderInput
      | OrderItemUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutOrderInput,
          OrderItemUncheckedCreateWithoutOrderInput
        >
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutOrderInput
      | OrderItemUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type ProductCreateNestedOneWithoutProductIngredientsInput = {
    create?: XOR<
      ProductCreateWithoutProductIngredientsInput,
      ProductUncheckedCreateWithoutProductIngredientsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutProductIngredientsInput;
    connect?: ProductWhereUniqueInput;
  };

  export type IngredientCreateNestedOneWithoutProductIngredientsInput = {
    create?: XOR<
      IngredientCreateWithoutProductIngredientsInput,
      IngredientUncheckedCreateWithoutProductIngredientsInput
    >;
    connectOrCreate?: IngredientCreateOrConnectWithoutProductIngredientsInput;
    connect?: IngredientWhereUniqueInput;
  };

  export type ProductUpdateOneRequiredWithoutProductIngredientsNestedInput = {
    create?: XOR<
      ProductCreateWithoutProductIngredientsInput,
      ProductUncheckedCreateWithoutProductIngredientsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutProductIngredientsInput;
    upsert?: ProductUpsertWithoutProductIngredientsInput;
    connect?: ProductWhereUniqueInput;
    update?: XOR<
      XOR<
        ProductUpdateToOneWithWhereWithoutProductIngredientsInput,
        ProductUpdateWithoutProductIngredientsInput
      >,
      ProductUncheckedUpdateWithoutProductIngredientsInput
    >;
  };

  export type IngredientUpdateOneRequiredWithoutProductIngredientsNestedInput =
    {
      create?: XOR<
        IngredientCreateWithoutProductIngredientsInput,
        IngredientUncheckedCreateWithoutProductIngredientsInput
      >;
      connectOrCreate?: IngredientCreateOrConnectWithoutProductIngredientsInput;
      upsert?: IngredientUpsertWithoutProductIngredientsInput;
      connect?: IngredientWhereUniqueInput;
      update?: XOR<
        XOR<
          IngredientUpdateToOneWithWhereWithoutProductIngredientsInput,
          IngredientUpdateWithoutProductIngredientsInput
        >,
        IngredientUncheckedUpdateWithoutProductIngredientsInput
      >;
    };

  export type OrderCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<
      OrderCreateWithoutOrderItemsInput,
      OrderUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: OrderCreateOrConnectWithoutOrderItemsInput;
    connect?: OrderWhereUniqueInput;
  };

  export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput;
    connect?: ProductWhereUniqueInput;
  };

  export type OrderUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<
      OrderCreateWithoutOrderItemsInput,
      OrderUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: OrderCreateOrConnectWithoutOrderItemsInput;
    upsert?: OrderUpsertWithoutOrderItemsInput;
    connect?: OrderWhereUniqueInput;
    update?: XOR<
      XOR<
        OrderUpdateToOneWithWhereWithoutOrderItemsInput,
        OrderUpdateWithoutOrderItemsInput
      >,
      OrderUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput;
    upsert?: ProductUpsertWithoutOrderItemsInput;
    connect?: ProductWhereUniqueInput;
    update?: XOR<
      XOR<
        ProductUpdateToOneWithWhereWithoutOrderItemsInput,
        ProductUpdateWithoutOrderItemsInput
      >,
      ProductUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedEnumTableStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TableStatus | EnumTableStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TableStatus[] | ListEnumTableStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.TableStatus[]
      | ListEnumTableStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumTableStatusFilter<$PrismaModel> | $Enums.TableStatus;
  };

  export type NestedEnumTableStatusWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.TableStatus | EnumTableStatusFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.TableStatus[]
        | ListEnumTableStatusFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.TableStatus[]
        | ListEnumTableStatusFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumTableStatusWithAggregatesFilter<$PrismaModel>
        | $Enums.TableStatus;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumTableStatusFilter<$PrismaModel>;
      _max?: NestedEnumTableStatusFilter<$PrismaModel>;
    };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedDecimalFilter<$PrismaModel>;
    _sum?: NestedDecimalFilter<$PrismaModel>;
    _min?: NestedDecimalFilter<$PrismaModel>;
    _max?: NestedDecimalFilter<$PrismaModel>;
  };

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>
      | null;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalNullableFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
  };

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.PaymentStatus
      | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
  };

  export type NestedEnumKitchenStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.KitchenStatus
      | EnumKitchenStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.KitchenStatus[]
      | ListEnumKitchenStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.KitchenStatus[]
      | ListEnumKitchenStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumKitchenStatusFilter<$PrismaModel> | $Enums.KitchenStatus;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>
        | null;
      in?:
        | Decimal[]
        | DecimalJsLike[]
        | number[]
        | string[]
        | ListDecimalFieldRefInput<$PrismaModel>
        | null;
      notIn?:
        | Decimal[]
        | DecimalJsLike[]
        | number[]
        | string[]
        | ListDecimalFieldRefInput<$PrismaModel>
        | null;
      lt?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>;
      lte?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>;
      gt?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>;
      gte?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>;
      not?:
        | NestedDecimalNullableWithAggregatesFilter<$PrismaModel>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _avg?: NestedDecimalNullableFilter<$PrismaModel>;
      _sum?: NestedDecimalNullableFilter<$PrismaModel>;
      _min?: NestedDecimalNullableFilter<$PrismaModel>;
      _max?: NestedDecimalNullableFilter<$PrismaModel>;
    };

  export type NestedEnumPaymentStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.PaymentStatus
      | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.PaymentStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>;
  };

  export type NestedEnumKitchenStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.KitchenStatus
      | EnumKitchenStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.KitchenStatus[]
      | ListEnumKitchenStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.KitchenStatus[]
      | ListEnumKitchenStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumKitchenStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.KitchenStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumKitchenStatusFilter<$PrismaModel>;
    _max?: NestedEnumKitchenStatusFilter<$PrismaModel>;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        | Date[]
        | string[]
        | ListDateTimeFieldRefInput<$PrismaModel>
        | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type ProductCreateWithoutCategoryInput = {
    legacyId?: number | null;
    name: string;
    aiDescription?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    isAvailable?: boolean;
    productIngredients?: ProductIngredientCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: number;
    legacyId?: number | null;
    name: string;
    aiDescription?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    isAvailable?: boolean;
    productIngredients?: ProductIngredientUncheckedCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutCategoryInput,
      ProductUncheckedCreateWithoutCategoryInput
    >;
  };

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[];
    skipDuplicates?: boolean;
  };

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput;
    update: XOR<
      ProductUpdateWithoutCategoryInput,
      ProductUncheckedUpdateWithoutCategoryInput
    >;
    create: XOR<
      ProductCreateWithoutCategoryInput,
      ProductUncheckedCreateWithoutCategoryInput
    >;
  };

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput;
    data: XOR<
      ProductUpdateWithoutCategoryInput,
      ProductUncheckedUpdateWithoutCategoryInput
    >;
  };

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput;
    data: XOR<
      ProductUpdateManyMutationInput,
      ProductUncheckedUpdateManyWithoutCategoryInput
    >;
  };

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[];
    OR?: ProductScalarWhereInput[];
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[];
    id?: IntFilter<'Product'> | number;
    legacyId?: IntNullableFilter<'Product'> | number | null;
    categoryId?: IntFilter<'Product'> | number;
    name?: StringFilter<'Product'> | string;
    aiDescription?: StringNullableFilter<'Product'> | string | null;
    price?:
      | DecimalFilter<'Product'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolFilter<'Product'> | boolean;
  };

  export type OrderCreateWithoutTableInput = {
    chatSessionId?: string | null;
    paymentCode?: string | null;
    total?: Decimal | DecimalJsLike | number | string | null;
    paymentStatus?: $Enums.PaymentStatus;
    kitchenStatus?: $Enums.KitchenStatus;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
    orderItems?: OrderItemCreateNestedManyWithoutOrderInput;
  };

  export type OrderUncheckedCreateWithoutTableInput = {
    id?: number;
    chatSessionId?: string | null;
    paymentCode?: string | null;
    total?: Decimal | DecimalJsLike | number | string | null;
    paymentStatus?: $Enums.PaymentStatus;
    kitchenStatus?: $Enums.KitchenStatus;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderCreateOrConnectWithoutTableInput = {
    where: OrderWhereUniqueInput;
    create: XOR<
      OrderCreateWithoutTableInput,
      OrderUncheckedCreateWithoutTableInput
    >;
  };

  export type OrderCreateManyTableInputEnvelope = {
    data: OrderCreateManyTableInput | OrderCreateManyTableInput[];
    skipDuplicates?: boolean;
  };

  export type OrderUpsertWithWhereUniqueWithoutTableInput = {
    where: OrderWhereUniqueInput;
    update: XOR<
      OrderUpdateWithoutTableInput,
      OrderUncheckedUpdateWithoutTableInput
    >;
    create: XOR<
      OrderCreateWithoutTableInput,
      OrderUncheckedCreateWithoutTableInput
    >;
  };

  export type OrderUpdateWithWhereUniqueWithoutTableInput = {
    where: OrderWhereUniqueInput;
    data: XOR<
      OrderUpdateWithoutTableInput,
      OrderUncheckedUpdateWithoutTableInput
    >;
  };

  export type OrderUpdateManyWithWhereWithoutTableInput = {
    where: OrderScalarWhereInput;
    data: XOR<
      OrderUpdateManyMutationInput,
      OrderUncheckedUpdateManyWithoutTableInput
    >;
  };

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[];
    OR?: OrderScalarWhereInput[];
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[];
    id?: IntFilter<'Order'> | number;
    tableId?: IntFilter<'Order'> | number;
    chatSessionId?: UuidNullableFilter<'Order'> | string | null;
    paymentCode?: StringNullableFilter<'Order'> | string | null;
    total?:
      | DecimalNullableFilter<'Order'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    paymentStatus?: EnumPaymentStatusFilter<'Order'> | $Enums.PaymentStatus;
    kitchenStatus?: EnumKitchenStatusFilter<'Order'> | $Enums.KitchenStatus;
    createdAt?: DateTimeFilter<'Order'> | Date | string;
    deletedAt?: DateTimeNullableFilter<'Order'> | Date | string | null;
  };

  export type ProductIngredientCreateWithoutIngredientInput = {
    isOptional?: boolean;
    product: ProductCreateNestedOneWithoutProductIngredientsInput;
  };

  export type ProductIngredientUncheckedCreateWithoutIngredientInput = {
    productId: number;
    isOptional?: boolean;
  };

  export type ProductIngredientCreateOrConnectWithoutIngredientInput = {
    where: ProductIngredientWhereUniqueInput;
    create: XOR<
      ProductIngredientCreateWithoutIngredientInput,
      ProductIngredientUncheckedCreateWithoutIngredientInput
    >;
  };

  export type ProductIngredientCreateManyIngredientInputEnvelope = {
    data:
      | ProductIngredientCreateManyIngredientInput
      | ProductIngredientCreateManyIngredientInput[];
    skipDuplicates?: boolean;
  };

  export type ProductIngredientUpsertWithWhereUniqueWithoutIngredientInput = {
    where: ProductIngredientWhereUniqueInput;
    update: XOR<
      ProductIngredientUpdateWithoutIngredientInput,
      ProductIngredientUncheckedUpdateWithoutIngredientInput
    >;
    create: XOR<
      ProductIngredientCreateWithoutIngredientInput,
      ProductIngredientUncheckedCreateWithoutIngredientInput
    >;
  };

  export type ProductIngredientUpdateWithWhereUniqueWithoutIngredientInput = {
    where: ProductIngredientWhereUniqueInput;
    data: XOR<
      ProductIngredientUpdateWithoutIngredientInput,
      ProductIngredientUncheckedUpdateWithoutIngredientInput
    >;
  };

  export type ProductIngredientUpdateManyWithWhereWithoutIngredientInput = {
    where: ProductIngredientScalarWhereInput;
    data: XOR<
      ProductIngredientUpdateManyMutationInput,
      ProductIngredientUncheckedUpdateManyWithoutIngredientInput
    >;
  };

  export type ProductIngredientScalarWhereInput = {
    AND?:
      | ProductIngredientScalarWhereInput
      | ProductIngredientScalarWhereInput[];
    OR?: ProductIngredientScalarWhereInput[];
    NOT?:
      | ProductIngredientScalarWhereInput
      | ProductIngredientScalarWhereInput[];
    productId?: IntFilter<'ProductIngredient'> | number;
    ingredientId?: IntFilter<'ProductIngredient'> | number;
    isOptional?: BoolFilter<'ProductIngredient'> | boolean;
  };

  export type CategoryCreateWithoutProductsInput = {
    name: string;
    isActive?: boolean;
  };

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: number;
    name: string;
    isActive?: boolean;
  };

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput;
    create: XOR<
      CategoryCreateWithoutProductsInput,
      CategoryUncheckedCreateWithoutProductsInput
    >;
  };

  export type ProductIngredientCreateWithoutProductInput = {
    isOptional?: boolean;
    ingredient: IngredientCreateNestedOneWithoutProductIngredientsInput;
  };

  export type ProductIngredientUncheckedCreateWithoutProductInput = {
    ingredientId: number;
    isOptional?: boolean;
  };

  export type ProductIngredientCreateOrConnectWithoutProductInput = {
    where: ProductIngredientWhereUniqueInput;
    create: XOR<
      ProductIngredientCreateWithoutProductInput,
      ProductIngredientUncheckedCreateWithoutProductInput
    >;
  };

  export type ProductIngredientCreateManyProductInputEnvelope = {
    data:
      | ProductIngredientCreateManyProductInput
      | ProductIngredientCreateManyProductInput[];
    skipDuplicates?: boolean;
  };

  export type OrderItemCreateWithoutProductInput = {
    quantity?: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    aiNotes?: string | null;
    order: OrderCreateNestedOneWithoutOrderItemsInput;
  };

  export type OrderItemUncheckedCreateWithoutProductInput = {
    id?: number;
    orderId: number;
    quantity?: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    aiNotes?: string | null;
  };

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput;
    create: XOR<
      OrderItemCreateWithoutProductInput,
      OrderItemUncheckedCreateWithoutProductInput
    >;
  };

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[];
    skipDuplicates?: boolean;
  };

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<
      CategoryUpdateWithoutProductsInput,
      CategoryUncheckedUpdateWithoutProductsInput
    >;
    create: XOR<
      CategoryCreateWithoutProductsInput,
      CategoryUncheckedCreateWithoutProductsInput
    >;
    where?: CategoryWhereInput;
  };

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput;
    data: XOR<
      CategoryUpdateWithoutProductsInput,
      CategoryUncheckedUpdateWithoutProductsInput
    >;
  };

  export type CategoryUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ProductIngredientUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductIngredientWhereUniqueInput;
    update: XOR<
      ProductIngredientUpdateWithoutProductInput,
      ProductIngredientUncheckedUpdateWithoutProductInput
    >;
    create: XOR<
      ProductIngredientCreateWithoutProductInput,
      ProductIngredientUncheckedCreateWithoutProductInput
    >;
  };

  export type ProductIngredientUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductIngredientWhereUniqueInput;
    data: XOR<
      ProductIngredientUpdateWithoutProductInput,
      ProductIngredientUncheckedUpdateWithoutProductInput
    >;
  };

  export type ProductIngredientUpdateManyWithWhereWithoutProductInput = {
    where: ProductIngredientScalarWhereInput;
    data: XOR<
      ProductIngredientUpdateManyMutationInput,
      ProductIngredientUncheckedUpdateManyWithoutProductInput
    >;
  };

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput;
    update: XOR<
      OrderItemUpdateWithoutProductInput,
      OrderItemUncheckedUpdateWithoutProductInput
    >;
    create: XOR<
      OrderItemCreateWithoutProductInput,
      OrderItemUncheckedCreateWithoutProductInput
    >;
  };

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput;
    data: XOR<
      OrderItemUpdateWithoutProductInput,
      OrderItemUncheckedUpdateWithoutProductInput
    >;
  };

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput;
    data: XOR<
      OrderItemUpdateManyMutationInput,
      OrderItemUncheckedUpdateManyWithoutProductInput
    >;
  };

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
    OR?: OrderItemScalarWhereInput[];
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
    id?: IntFilter<'OrderItem'> | number;
    orderId?: IntFilter<'OrderItem'> | number;
    productId?: IntFilter<'OrderItem'> | number;
    quantity?: IntFilter<'OrderItem'> | number;
    unitPrice?:
      | DecimalFilter<'OrderItem'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aiNotes?: StringNullableFilter<'OrderItem'> | string | null;
  };

  export type TableCreateWithoutOrdersInput = {
    tableName: string;
    status?: $Enums.TableStatus;
  };

  export type TableUncheckedCreateWithoutOrdersInput = {
    id?: number;
    tableName: string;
    status?: $Enums.TableStatus;
  };

  export type TableCreateOrConnectWithoutOrdersInput = {
    where: TableWhereUniqueInput;
    create: XOR<
      TableCreateWithoutOrdersInput,
      TableUncheckedCreateWithoutOrdersInput
    >;
  };

  export type OrderItemCreateWithoutOrderInput = {
    quantity?: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    aiNotes?: string | null;
    product: ProductCreateNestedOneWithoutOrderItemsInput;
  };

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: number;
    productId: number;
    quantity?: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    aiNotes?: string | null;
  };

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput;
    create: XOR<
      OrderItemCreateWithoutOrderInput,
      OrderItemUncheckedCreateWithoutOrderInput
    >;
  };

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[];
    skipDuplicates?: boolean;
  };

  export type TableUpsertWithoutOrdersInput = {
    update: XOR<
      TableUpdateWithoutOrdersInput,
      TableUncheckedUpdateWithoutOrdersInput
    >;
    create: XOR<
      TableCreateWithoutOrdersInput,
      TableUncheckedCreateWithoutOrdersInput
    >;
    where?: TableWhereInput;
  };

  export type TableUpdateToOneWithWhereWithoutOrdersInput = {
    where?: TableWhereInput;
    data: XOR<
      TableUpdateWithoutOrdersInput,
      TableUncheckedUpdateWithoutOrdersInput
    >;
  };

  export type TableUpdateWithoutOrdersInput = {
    tableName?: StringFieldUpdateOperationsInput | string;
    status?: EnumTableStatusFieldUpdateOperationsInput | $Enums.TableStatus;
  };

  export type TableUncheckedUpdateWithoutOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number;
    tableName?: StringFieldUpdateOperationsInput | string;
    status?: EnumTableStatusFieldUpdateOperationsInput | $Enums.TableStatus;
  };

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput;
    update: XOR<
      OrderItemUpdateWithoutOrderInput,
      OrderItemUncheckedUpdateWithoutOrderInput
    >;
    create: XOR<
      OrderItemCreateWithoutOrderInput,
      OrderItemUncheckedCreateWithoutOrderInput
    >;
  };

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput;
    data: XOR<
      OrderItemUpdateWithoutOrderInput,
      OrderItemUncheckedUpdateWithoutOrderInput
    >;
  };

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput;
    data: XOR<
      OrderItemUpdateManyMutationInput,
      OrderItemUncheckedUpdateManyWithoutOrderInput
    >;
  };

  export type ProductCreateWithoutProductIngredientsInput = {
    legacyId?: number | null;
    name: string;
    aiDescription?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    isAvailable?: boolean;
    category: CategoryCreateNestedOneWithoutProductsInput;
    orderItems?: OrderItemCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateWithoutProductIngredientsInput = {
    id?: number;
    legacyId?: number | null;
    categoryId: number;
    name: string;
    aiDescription?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    isAvailable?: boolean;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductCreateOrConnectWithoutProductIngredientsInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutProductIngredientsInput,
      ProductUncheckedCreateWithoutProductIngredientsInput
    >;
  };

  export type IngredientCreateWithoutProductIngredientsInput = {
    name: string;
    isAllergen?: boolean;
  };

  export type IngredientUncheckedCreateWithoutProductIngredientsInput = {
    id?: number;
    name: string;
    isAllergen?: boolean;
  };

  export type IngredientCreateOrConnectWithoutProductIngredientsInput = {
    where: IngredientWhereUniqueInput;
    create: XOR<
      IngredientCreateWithoutProductIngredientsInput,
      IngredientUncheckedCreateWithoutProductIngredientsInput
    >;
  };

  export type ProductUpsertWithoutProductIngredientsInput = {
    update: XOR<
      ProductUpdateWithoutProductIngredientsInput,
      ProductUncheckedUpdateWithoutProductIngredientsInput
    >;
    create: XOR<
      ProductCreateWithoutProductIngredientsInput,
      ProductUncheckedCreateWithoutProductIngredientsInput
    >;
    where?: ProductWhereInput;
  };

  export type ProductUpdateToOneWithWhereWithoutProductIngredientsInput = {
    where?: ProductWhereInput;
    data: XOR<
      ProductUpdateWithoutProductIngredientsInput,
      ProductUncheckedUpdateWithoutProductIngredientsInput
    >;
  };

  export type ProductUpdateWithoutProductIngredientsInput = {
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null;
    name?: StringFieldUpdateOperationsInput | string;
    aiDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolFieldUpdateOperationsInput | boolean;
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput;
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateWithoutProductIngredientsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null;
    categoryId?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    aiDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolFieldUpdateOperationsInput | boolean;
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type IngredientUpsertWithoutProductIngredientsInput = {
    update: XOR<
      IngredientUpdateWithoutProductIngredientsInput,
      IngredientUncheckedUpdateWithoutProductIngredientsInput
    >;
    create: XOR<
      IngredientCreateWithoutProductIngredientsInput,
      IngredientUncheckedCreateWithoutProductIngredientsInput
    >;
    where?: IngredientWhereInput;
  };

  export type IngredientUpdateToOneWithWhereWithoutProductIngredientsInput = {
    where?: IngredientWhereInput;
    data: XOR<
      IngredientUpdateWithoutProductIngredientsInput,
      IngredientUncheckedUpdateWithoutProductIngredientsInput
    >;
  };

  export type IngredientUpdateWithoutProductIngredientsInput = {
    name?: StringFieldUpdateOperationsInput | string;
    isAllergen?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type IngredientUncheckedUpdateWithoutProductIngredientsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    isAllergen?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type OrderCreateWithoutOrderItemsInput = {
    chatSessionId?: string | null;
    paymentCode?: string | null;
    total?: Decimal | DecimalJsLike | number | string | null;
    paymentStatus?: $Enums.PaymentStatus;
    kitchenStatus?: $Enums.KitchenStatus;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
    table: TableCreateNestedOneWithoutOrdersInput;
  };

  export type OrderUncheckedCreateWithoutOrderItemsInput = {
    id?: number;
    tableId: number;
    chatSessionId?: string | null;
    paymentCode?: string | null;
    total?: Decimal | DecimalJsLike | number | string | null;
    paymentStatus?: $Enums.PaymentStatus;
    kitchenStatus?: $Enums.KitchenStatus;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
  };

  export type OrderCreateOrConnectWithoutOrderItemsInput = {
    where: OrderWhereUniqueInput;
    create: XOR<
      OrderCreateWithoutOrderItemsInput,
      OrderUncheckedCreateWithoutOrderItemsInput
    >;
  };

  export type ProductCreateWithoutOrderItemsInput = {
    legacyId?: number | null;
    name: string;
    aiDescription?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    isAvailable?: boolean;
    category: CategoryCreateNestedOneWithoutProductsInput;
    productIngredients?: ProductIngredientCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateWithoutOrderItemsInput = {
    id?: number;
    legacyId?: number | null;
    categoryId: number;
    name: string;
    aiDescription?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    isAvailable?: boolean;
    productIngredients?: ProductIngredientUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
  };

  export type OrderUpsertWithoutOrderItemsInput = {
    update: XOR<
      OrderUpdateWithoutOrderItemsInput,
      OrderUncheckedUpdateWithoutOrderItemsInput
    >;
    create: XOR<
      OrderCreateWithoutOrderItemsInput,
      OrderUncheckedCreateWithoutOrderItemsInput
    >;
    where?: OrderWhereInput;
  };

  export type OrderUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: OrderWhereInput;
    data: XOR<
      OrderUpdateWithoutOrderItemsInput,
      OrderUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type OrderUpdateWithoutOrderItemsInput = {
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentCode?: NullableStringFieldUpdateOperationsInput | string | null;
    total?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    kitchenStatus?:
      | EnumKitchenStatusFieldUpdateOperationsInput
      | $Enums.KitchenStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    table?: TableUpdateOneRequiredWithoutOrdersNestedInput;
  };

  export type OrderUncheckedUpdateWithoutOrderItemsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    tableId?: IntFieldUpdateOperationsInput | number;
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentCode?: NullableStringFieldUpdateOperationsInput | string | null;
    total?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    kitchenStatus?:
      | EnumKitchenStatusFieldUpdateOperationsInput
      | $Enums.KitchenStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ProductUpsertWithoutOrderItemsInput = {
    update: XOR<
      ProductUpdateWithoutOrderItemsInput,
      ProductUncheckedUpdateWithoutOrderItemsInput
    >;
    create: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
    where?: ProductWhereInput;
  };

  export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductWhereInput;
    data: XOR<
      ProductUpdateWithoutOrderItemsInput,
      ProductUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type ProductUpdateWithoutOrderItemsInput = {
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null;
    name?: StringFieldUpdateOperationsInput | string;
    aiDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolFieldUpdateOperationsInput | boolean;
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput;
    productIngredients?: ProductIngredientUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null;
    categoryId?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    aiDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolFieldUpdateOperationsInput | boolean;
    productIngredients?: ProductIngredientUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type ProductCreateManyCategoryInput = {
    id?: number;
    legacyId?: number | null;
    name: string;
    aiDescription?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    isAvailable?: boolean;
  };

  export type ProductUpdateWithoutCategoryInput = {
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null;
    name?: StringFieldUpdateOperationsInput | string;
    aiDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolFieldUpdateOperationsInput | boolean;
    productIngredients?: ProductIngredientUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number;
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null;
    name?: StringFieldUpdateOperationsInput | string;
    aiDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolFieldUpdateOperationsInput | boolean;
    productIngredients?: ProductIngredientUncheckedUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number;
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null;
    name?: StringFieldUpdateOperationsInput | string;
    aiDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    isAvailable?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type OrderCreateManyTableInput = {
    id?: number;
    chatSessionId?: string | null;
    paymentCode?: string | null;
    total?: Decimal | DecimalJsLike | number | string | null;
    paymentStatus?: $Enums.PaymentStatus;
    kitchenStatus?: $Enums.KitchenStatus;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
  };

  export type OrderUpdateWithoutTableInput = {
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentCode?: NullableStringFieldUpdateOperationsInput | string | null;
    total?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    kitchenStatus?:
      | EnumKitchenStatusFieldUpdateOperationsInput
      | $Enums.KitchenStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    orderItems?: OrderItemUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateWithoutTableInput = {
    id?: IntFieldUpdateOperationsInput | number;
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentCode?: NullableStringFieldUpdateOperationsInput | string | null;
    total?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    kitchenStatus?:
      | EnumKitchenStatusFieldUpdateOperationsInput
      | $Enums.KitchenStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    orderItems?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateManyWithoutTableInput = {
    id?: IntFieldUpdateOperationsInput | number;
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentCode?: NullableStringFieldUpdateOperationsInput | string | null;
    total?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    kitchenStatus?:
      | EnumKitchenStatusFieldUpdateOperationsInput
      | $Enums.KitchenStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type ProductIngredientCreateManyIngredientInput = {
    productId: number;
    isOptional?: boolean;
  };

  export type ProductIngredientUpdateWithoutIngredientInput = {
    isOptional?: BoolFieldUpdateOperationsInput | boolean;
    product?: ProductUpdateOneRequiredWithoutProductIngredientsNestedInput;
  };

  export type ProductIngredientUncheckedUpdateWithoutIngredientInput = {
    productId?: IntFieldUpdateOperationsInput | number;
    isOptional?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ProductIngredientUncheckedUpdateManyWithoutIngredientInput = {
    productId?: IntFieldUpdateOperationsInput | number;
    isOptional?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ProductIngredientCreateManyProductInput = {
    ingredientId: number;
    isOptional?: boolean;
  };

  export type OrderItemCreateManyProductInput = {
    id?: number;
    orderId: number;
    quantity?: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    aiNotes?: string | null;
  };

  export type ProductIngredientUpdateWithoutProductInput = {
    isOptional?: BoolFieldUpdateOperationsInput | boolean;
    ingredient?: IngredientUpdateOneRequiredWithoutProductIngredientsNestedInput;
  };

  export type ProductIngredientUncheckedUpdateWithoutProductInput = {
    ingredientId?: IntFieldUpdateOperationsInput | number;
    isOptional?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ProductIngredientUncheckedUpdateManyWithoutProductInput = {
    ingredientId?: IntFieldUpdateOperationsInput | number;
    isOptional?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type OrderItemUpdateWithoutProductInput = {
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aiNotes?: NullableStringFieldUpdateOperationsInput | string | null;
    order?: OrderUpdateOneRequiredWithoutOrderItemsNestedInput;
  };

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number;
    orderId?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aiNotes?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number;
    orderId?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aiNotes?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type OrderItemCreateManyOrderInput = {
    id?: number;
    productId: number;
    quantity?: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    aiNotes?: string | null;
  };

  export type OrderItemUpdateWithoutOrderInput = {
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aiNotes?: NullableStringFieldUpdateOperationsInput | string | null;
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput;
  };

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number;
    productId?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aiNotes?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number;
    productId?: IntFieldUpdateOperationsInput | number;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aiNotes?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
