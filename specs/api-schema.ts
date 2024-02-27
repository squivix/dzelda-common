/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserSchema {
  /**
   * @minLength 4
   * @maxLength 20
   * @pattern ^[A-Za-z0-9]*$
   */
  username: string;
  /** @format email */
  email?: string;
  isEmailConfirmed?: boolean;
  isPendingEmailChange?: boolean;
  profile: ProfileSchema;
}

export interface ProfileSchema {
  id: number;
  username: string;
  languagesLearning: LanguageSchema[];
  /** @format uri */
  profilePicture: string;
  bio: string;
  isPublic: boolean;
}

export interface LanguageSchema {
  id: number;
  /**
   * @minLength 2
   * @maxLength 4
   */
  code: string;
  name: string;
  greeting: string;
  /** @format uri */
  flag: string | null;
  /** @format uri */
  flagCircular: string | null;
  flagEmoji: string | null;
  levelThresholds: {
    beginner1: number;
    beginner2: number;
    intermediate1: number;
    intermediate2: number;
    advanced1: number;
    advanced2: number;
  };
  learnersCount: number;
  color: string;
}

export interface CollectionSchema {
  id: number;
  title: string;
  description: string;
  /** @format uri */
  image: string;
  language: string;
  addedBy: string;
  /** @format date-time */
  addedOn: string;
  texts: TextSchema[];
  vocabsByLevel?: VocabsByLevelSchema;
  isBookmarked?: boolean;
}

export interface TextSchema {
  id: number;
  title: string;
  content: string;
  /** @format uri */
  audio: string;
  /** @format uri */
  image: string;
  collection: CollectionSchema | null;
  orderInCollection?: number;
  isLastInCollection?: boolean;
  /** @format date-time */
  addedOn: string;
  learnersCount: number;
  vocabsByLevel?: VocabsByLevelSchema;
  parsedTitle: string | null;
  parsedContent: string | null;
  isPublic: boolean;
  addedBy: string;
  language: string;
  level?: LanguageLevelSchema;
  isBookmarked?: boolean;
}

export interface VocabSchema {
  id: number;
  text: string;
  isPhrase: boolean;
  language: string;
  meanings: MeaningSchema[];
  /** @min 0 */
  learnersCount: number;
  /** @min 0 */
  textsCount: number;
}

export interface MeaningSchema {
  id: number;
  text: string;
  vocab: VocabSchema;
  learnersCount: number;
  addedBy: string;
  language: string;
  /** @format date-time */
  addedOn: string;
  attribution: null | AttributionSchema;
}

export interface DictionarySchema {
  id: number;
  name: string;
  lookupLink: string;
  language: string;
  dictionaryLink: string;
  isPronunciation: boolean;
}

/** LearnerVocab */
export interface LearnerVocabSchema {
  id: number;
  text: string;
  isPhrase: boolean;
  level: VocabLevelSchema;
  notes: string | null;
  language: string;
  meanings: MeaningSchema[];
  learnerMeanings: MeaningSchema[];
  ttsPronunciations: TTSPronunciationSchema[];
}

/** LearnerLanguage */
export interface LearnerLanguageSchema {
  id: number;
  code: string;
  name: string;
  greeting: string;
  /** @format uri */
  flag: string | null;
  /** @format uri */
  flagCircular: string | null;
  /** @format uri */
  flagEmoji: string | null;
  isSupported: boolean;
  levelThresholds: {
    beginner1: number;
    beginner2: number;
    intermediate1: number;
    intermediate2: number;
    advanced1: number;
    advanced2: number;
  };
  learnersCount: number;
  /** @format date-time */
  startedLearningOn: string;
  /** @format date-time */
  lastOpened: string;
  color: string | null;
  preferredTtsVoice: null | TTSVoiceSchema;
  preferredTranslationLanguages: TranslationLanguageSchema[];
}

/** VocabLevel */
export enum VocabLevelSchema {
  IGNORED = -1,
  NEW = 0,
  LEVEL1 = 1,
  LEVEL2 = 2,
  LEVEL3 = 3,
  LEVEL4 = 4,
  LEARNED = 5,
  KNOWN = 6,
}

/** LanguageLevel */
export enum LanguageLevelSchema {
  BEGINNER1 = "beginner1",
  BEGINNER2 = "beginner2",
  INTERMEDIATE1 = "intermediate1",
  INTERMEDIATE2 = "intermediate2",
  ADVANCED1 = "advanced1",
  ADVANCED2 = "advanced2",
}

/** VocabsByLevel */
export interface VocabsByLevelSchema {
  "0": number;
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "-1": number;
}

/** TextHistoryEntry */
export interface TextHistoryEntrySchema {
  id: number;
  title: string;
  content: string;
  /** @format uri */
  audio: string;
  /** @format uri */
  image: string;
  collection: CollectionSchema;
  orderInCollection: number;
  isLastInCollection: boolean;
  /** @format date-time */
  addedOn: string;
  learnersCount: number;
  vocabsByLevel?: VocabsByLevelSchema;
  parsedTitle: string | null;
  parsedContent: string | null;
  /** @format date-time */
  timeViewed: string;
  pastViewer: string;
  addedBy: string;
  isPublic: boolean;
  isBookmarked?: string;
}

/** TTSPronunciation */
export interface TTSPronunciationSchema {
  id: number;
  /** @format uri */
  url: string;
  /** @format date-time */
  addedOn: string;
  voice?: TTSVoiceSchema;
  vocab?: VocabSchema;
}

/** TTSVoice */
export interface TTSVoiceSchema {
  id: number;
  code: string;
  name: string;
  gender: string;
  provider: string;
  accentCountryCode: string;
  language: string;
  isDefault: boolean;
}

/** HumanPronunciation */
export interface HumanPronunciationSchema {
  id: number;
  /** @format uri */
  url: string;
  text: string;
  parsedText: string;
  speakerCountryCode: string | null;
  speakerRegion: string | null;
  language: string;
  attribution: null | AttributionSchema;
}

/** Attribution */
export interface AttributionSchema {
  sourceRootName: string;
  sourceRootUrl?: string;
  sourceRootLogoUrl?: string;
  sourcePageTitle?: string;
  sourcePageUrl?: string;
  authorName?: string;
  authorUrl?: string;
  licenseShortName: string;
  licenseLongName: string;
  licenseUrl?: string;
  attributionMarkdown: string;
}

/** TranslationLanguage */
export interface TranslationLanguageSchema {
  id: number;
  name: string;
  code: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:3000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      return data;
    });
  };
}

/**
 * @title dzelda-api
 * @version 1.0
 * @baseUrl http://localhost:3000
 */
export class ApiClient<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  users = {
    /**
     * @description Create a new user.
     *
     * @tags auth, user
     * @name PostUsers
     * @summary Sign Up
     * @request POST:/users/
     */
    postUsers: (
      data: {
        /**
         * @minLength 4
         * @maxLength 20
         * @pattern ^[A-Za-z0-9]*$
         */
        username: string;
        /**
         * @format password
         * @minLength 8
         */
        password: string;
        /** @format email */
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        UserSchema,
        {
          code: 400;
          status: "Bad Request";
          message: string;
          details: string;
          fields?: object;
        }
      >({
        path: `/users/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get user details, including profile.
     *
     * @tags user
     * @name GetUsersUsername
     * @summary Get User
     * @request GET:/users/{username}/
     * @secure
     */
    getUsersUsername: (username: string, params: RequestParams = {}) =>
      this.request<
        UserSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/${username}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PostUsersMeEmailConfirm
     * @summary Confirm Email
     * @request POST:/users/me/email/confirm/
     */
    postUsersMeEmailConfirm: (
      data: {
        token: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        {
          code: 401;
          status: "Unauthorized";
          message: string;
          details: string;
        }
      >({
        path: `/users/me/email/confirm/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name PostUsersMePasswordReset
     * @summary Reset Password
     * @request POST:/users/me/password/reset/
     * @secure
     */
    postUsersMePasswordReset: (
      data: {
        token: string;
        /**
         * @format password
         * @minLength 8
         */
        newPassword: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/password/reset/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name PutUsersMeEmail
     * @summary Change User Email
     * @request PUT:/users/me/email/
     * @secure
     */
    putUsersMeEmail: (
      data: {
        /** @format email */
        newEmail: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/email/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name PutUsersMePassword
     * @summary Change Password
     * @request PUT:/users/me/password/
     * @secure
     */
    putUsersMePassword: (
      data: {
        oldPassword: string;
        /** @minLength 8 */
        newPassword: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/password/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Delete account of currently logged in user, and everything associated with it. This action cannot be undone.
     *
     * @name DeleteUsersMe
     * @summary Delete Account
     * @request DELETE:/users/me/
     * @secure
     */
    deleteUsersMe: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/me/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name PutUsersMeProfile
     * @summary Update User Profile
     * @request PUT:/users/me/profile/
     * @secure
     */
    putUsersMeProfile: (
      data: {
        /** @maxLength 255 */
        bio: string;
        /** @format uri */
        profilePicture?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        ProfileSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 413;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 415;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object;
          }
      >({
        path: `/users/me/profile/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a list of langauges the user is learning.
     *
     * @tags language
     * @name GetUsersUsernameLanguages
     * @summary Get User Languages
     * @request GET:/users/{username}/languages/
     * @secure
     */
    getUsersUsernameLanguages: (
      username: string,
      query?: {
        /** @default "name" */
        sortBy?: "name" | "learnersCount" | "lastOpened";
        /** @default "asc" */
        sortOrder?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        LearnerLanguageSchema[],
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/${username}/languages/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Add a language to languages the user is learning.
     *
     * @tags language
     * @name PostUsersUsernameLanguages
     * @summary Add Language To User
     * @request POST:/users/me/languages/
     * @secure
     */
    postUsersUsernameLanguages: (
      data: {
        languageCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        LanguageSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/languages/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates user language data
     *
     * @tags language
     * @name PatchUsersMeLanguagesLanguageCode
     * @summary Update User Language
     * @request PATCH:/users/me/languages/{languageCode}/
     * @secure
     */
    patchUsersMeLanguagesLanguageCode: (
      languageCode: string,
      data: {
        lastOpened?: "now";
        preferredTranslationLanguageCodes?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        LearnerLanguageSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | void
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/languages/${languageCode}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Remove a language from list of languages the user is learning.
     *
     * @tags language
     * @name DeleteUsersMeLanguagesLanguageCode
     * @summary Delete Language From User
     * @request DELETE:/users/me/languages/{languageCode}/
     * @secure
     */
    deleteUsersMeLanguagesLanguageCode: (languageCode: string, params: RequestParams = {}) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/languages/${languageCode}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteUsersMeLanguagesLanguageCodeProgress
     * @summary Reset Language Progress
     * @request DELETE:/users/me/languages/{languageCode}/progress/
     * @secure
     */
    deleteUsersMeLanguagesLanguageCodeProgress: (languageCode: string, params: RequestParams = {}) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/languages/${languageCode}/progress/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get the list of collections the user has bookmarked.
     *
     * @tags collection
     * @name GetUsersMeCollectionsBookmarked
     * @summary Get User collections Bookmarked
     * @request GET:/users/me/collections/bookmarked/
     * @secure
     */
    getUsersMeCollectionsBookmarked: (
      query?: {
        /**
         * @minLength 2
         * @maxLength 4
         */
        language?: string;
        /**
         * @minLength 4
         * @maxLength 20
         */
        addedBy?: string;
        searchQuery?: string;
        page?: number;
        /**
         * @min 1
         * @max 100
         * @default 10
         */
        pageSize?: number;
        /** @default "title" */
        sortBy?: "title" | "createdDate" | "avgPastViewersCountPerText";
        /** @default "asc" */
        sortOrder?: "asc" | "desc";
        level?: LanguageLevelSchema[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @min 1 */
          page: number;
          /** @min 1 */
          pageSize: number;
          /** @min 0 */
          pageCount: number;
          data: CollectionSchema[];
        },
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/collections/bookmarked/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PostUsersMeCollectionsBookmarked
     * @summary Add collections to User Bookmarks
     * @request POST:/users/me/collections/bookmarked/
     * @secure
     */
    postUsersMeCollectionsBookmarked: (
      data: {
        /** @min 0 */
        collectionId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CollectionSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/collections/bookmarked/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteUsersMeCollectionsBookmarkedCollectionId
     * @summary Remove collection from User Bookmarks
     * @request DELETE:/users/me/collections/bookmarked/{collectionId}/
     * @secure
     */
    deleteUsersMeCollectionsBookmarkedCollectionId: (collectionId: number, params: RequestParams = {}) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/collections/bookmarked/${collectionId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get the list of texts the user has viewed.
     *
     * @tags text
     * @name GetUsersMeTextsHistory
     * @summary Get User Texts History
     * @request GET:/users/me/texts/history/
     * @secure
     */
    getUsersMeTextsHistory: (
      query?: {
        /**
         * @minLength 2
         * @maxLength 4
         */
        language?: string;
        searchQuery?: string;
        /**
         * @minLength 4
         * @maxLength 20
         */
        addedBy?: string;
        hasAudio?: boolean;
        page?: number;
        /**
         * @min 1
         * @max 100
         * @default 10
         */
        pageSize?: number;
        /** @default "title" */
        sortBy?: "title" | "createdDate" | "pastViewersCount" | "timeViewed";
        /** @default "asc" */
        sortOrder?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @min 1 */
          page: number;
          /**
           * @min 1
           * @max 100
           */
          pageSize: number;
          /** @min 0 */
          pageCount: number;
          data: TextSchema[];
        },
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/texts/history/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Add a text to user text history
     *
     * @tags text
     * @name PostUsersMeTextsHistory
     * @summary Add Text To User History
     * @request POST:/users/me/texts/history/
     * @secure
     */
    postUsersMeTextsHistory: (
      data: {
        textId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TextSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
      >({
        path: `/users/me/texts/history/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name GetUsersMeTextsBookmarked
     * @summary Get user bookmarked texts
     * @request GET:/users/me/texts/bookmarked/
     * @secure
     */
    getUsersMeTextsBookmarked: (
      query?: {
        /**
         * @minLength 2
         * @maxLength 4
         */
        languageCode?: string;
        searchQuery?: string;
        /**
         * @minLength 4
         * @maxLength 20
         */
        addedBy?: string;
        hasAudio?: boolean;
        /** @default "title" */
        sortBy?: "title" | "createdDate" | "pastViewersCount";
        /** @default "asc" */
        sortOrder?: "asc" | "desc";
        page?: number;
        /**
         * @min 1
         * @max 100
         * @default 10
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @min 1 */
          page: number;
          /**
           * @min 1
           * @max 100
           */
          pageSize: number;
          /** @min 0 */
          pageCount: number;
          data: TextSchema[];
        },
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/texts/bookmarked/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PostUsersMeTextsBookmarked
     * @summary Add text to user bookmarks
     * @request POST:/users/me/texts/bookmarked/
     * @secure
     */
    postUsersMeTextsBookmarked: (
      data: {
        textId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, TextSchema>({
        path: `/users/me/texts/bookmarked/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetUsersMeTextsHidden
     * @summary Get user hidden texts
     * @request GET:/users/me/texts/hidden/
     * @secure
     */
    getUsersMeTextsHidden: (
      query?: {
        /**
         * @minLength 2
         * @maxLength 4
         */
        languageCode?: string;
        searchQuery?: string;
        /**
         * @minLength 4
         * @maxLength 20
         */
        addedBy?: string;
        hasAudio?: boolean;
        /** @default "title" */
        sortBy?: "title" | "createdDate" | "pastViewersCount";
        /** @default "asc" */
        sortOrder?: "asc" | "desc";
        page?: number;
        /**
         * @min 1
         * @max 100
         * @default 10
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @min 1 */
          page: number;
          /**
           * @min 1
           * @max 100
           */
          pageSize: number;
          /** @min 0 */
          pageCount: number;
          data: TextSchema[];
        },
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/texts/hidden/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PostUsersMeTextsHidden
     * @summary Hide text for user
     * @request POST:/users/me/texts/hidden/
     * @secure
     */
    postUsersMeTextsHidden: (
      data: {
        textId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | TextSchema
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/texts/hidden/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteUsersMeTextsBookmarkedTextId
     * @summary Remove text from user bookmarks
     * @request DELETE:/users/me/texts/bookmarked/{textId}/
     * @secure
     */
    deleteUsersMeTextsBookmarkedTextId: (textId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/me/texts/bookmarked/${textId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get list of saved user vocabs.
     *
     * @tags vocab
     * @name GetUsersMeVocabs
     * @summary Get User Vocabs
     * @request GET:/users/me/vocabs/
     * @secure
     */
    getUsersMeVocabs: (
      query?: {
        languageCode?: string;
        level?: VocabLevelSchema[];
        searchQuery?: string;
        page?: number;
        /**
         * @min 1
         * @max 10
         * @default 10
         */
        pageSize?: number;
        /** @default "text" */
        sortBy?: "text" | "textsCount" | "learnersCount";
        /** @default "asc" */
        sortOrder?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @min 1 */
          page?: number;
          /**
           * @min 1
           * @max 100
           */
          pageSize?: number;
          /** @min 0 */
          pageCount?: number;
          data?: LearnerVocabSchema[];
        },
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
      >({
        path: `/users/me/vocabs/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PostUsersMeVocabs
     * @summary Add Vocab To User
     * @request POST:/users/me/vocabs/
     * @secure
     */
    postUsersMeVocabs: (
      data: {
        vocabId: number;
        level?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        LearnerVocabSchema,
        {
          code: 400;
          status: "Bad Request";
          message: string;
          details: string;
          fields?: object;
        }
      >({
        path: `/users/me/vocabs/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update user saved vocab details (level, notes).
     *
     * @tags vocab
     * @name PatchUsersMeVocabsVocabId
     * @summary Update User Vocab
     * @request PATCH:/users/me/vocabs/{vocabId}/
     * @secure
     */
    patchUsersMeVocabsVocabId: (
      vocabId: number,
      data: {
        level?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;
        notes?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        LearnerVocabSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/vocabs/${vocabId}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get user vocab details.
     *
     * @tags vocab
     * @name GetUsersMeVocabsVocabId
     * @summary Get User Vocab
     * @request GET:/users/me/vocabs/{vocabId}/
     * @secure
     */
    getUsersMeVocabsVocabId: (vocabId: number, params: RequestParams = {}) =>
      this.request<
        LearnerVocabSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/vocabs/${vocabId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteUsersMeVocabsVocabId
     * @summary Delete User Vocab
     * @request DELETE:/users/me/vocabs/{vocabId}/
     * @secure
     */
    deleteUsersMeVocabsVocabId: (vocabId: number, params: RequestParams = {}) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/vocabs/${vocabId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get a list of saved user meanings.
     *
     * @tags meaning
     * @name GetUsersMeMeanings
     * @summary Get User Meanings
     * @request GET:/users/me/meanings/
     * @secure
     */
    getUsersMeMeanings: (
      query?: {
        vocabId?: number;
        /** @default "text" */
        sortBy?: "text" | "learnersCount";
        /** @default "asc" */
        sortOrder?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        MeaningSchema[],
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
      >({
        path: `/users/me/meanings/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Adds a meaning to the saved user meanings.
     *
     * @tags meaning
     * @name PostUsersMeMeanings
     * @summary Add Meaning To User
     * @request POST:/users/me/meanings/
     * @secure
     */
    postUsersMeMeanings: (
      data: {
        meaningId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        MeaningSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/meanings/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Removes meaning from list of saved user meanings.
     *
     * @tags meaning
     * @name DeleteUsersMeMeaningsMeaningId
     * @summary Remove Meaning From User
     * @request DELETE:/users/me/meanings/{meaningId}/
     * @secure
     */
    deleteUsersMeMeaningsMeaningId: (meaningId: number, params: RequestParams = {}) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/meanings/${meaningId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Gets a list of user dictionaries.
     *
     * @tags dictionary
     * @name GetUsersMeDictionaries
     * @summary Get User Dictionaries
     * @request GET:/users/me/dictionaries/
     * @secure
     */
    getUsersMeDictionaries: (
      query?: {
        languageCode?: string;
        isPronunciation?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        DictionarySchema[],
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/dictionaries/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a count of vocabs saved by a user, optionally grouped by language
     *
     * @name GetUsersUsernameVocabsSavedCount
     * @summary Get User Saved Vocabs Count
     * @request GET:/users/{username}/vocabs/saved/count/
     * @secure
     */
    getUsersUsernameVocabsSavedCount: (
      username: string,
      query?: {
        /** @format date */
        savedOnFrom?: string;
        /** @format date */
        savedOnTo?: string;
        level?: VocabLevelSchema[];
        isPhrase?: boolean;
        groupBy?: "language";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          vocabsCount: number;
          language?: string;
        }[],
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/${username}/vocabs/saved/count/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a count of vocabs saved by a user every `savedOnInterval` between `savedOnFrom` and `savedOnTo`, optionally grouped by language
     *
     * @name GetUsersUsernameVocabsSavedCountTimeSeries
     * @summary Get Saved Vocabs Count Time Series
     * @request GET:/users/{username}/vocabs/saved/count/time-series/
     * @secure
     */
    getUsersUsernameVocabsSavedCountTimeSeries: (
      username: string,
      query?: {
        /**
         * @format date
         * @default "1970-01-01"
         */
        savedOnFrom?: string;
        /** @format date */
        savedOnTo?: string;
        savedOnInterval?: "day" | "month" | "year";
        groupBy?: "language";
        level?: VocabLevelSchema[];
        isPhrase?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          vocabsCount: number;
          language?: string;
          /** @format date */
          date?: string;
        }[],
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/${username}/vocabs/saved/count/time-series/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PutUsersMeLanguagesLanguageCodeDictionaries
     * @summary Update user language dictionaries
     * @request PUT:/users/me/languages/:languageCode/dictionaries/
     * @secure
     */
    putUsersMeLanguagesLanguageCodeDictionaries: (
      languageCode: string,
      data: {
        dictionaryIds: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
      >({
        path: `/users/me/languages/${languageCode}/dictionaries/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteUsersMeTextsHiddenTextId
     * @summary Unhide text for user
     * @request DELETE:/users/me/texts/hidden/{textId}/
     * @secure
     */
    deleteUsersMeTextsHiddenTextId: (textId: number, params: RequestParams = {}) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/users/me/texts/hidden/${textId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  sessions = {
    /**
     * @description Authenticate the user
     *
     * @tags auth
     * @name PostSessions
     * @summary Login
     * @request POST:/sessions/
     */
    postSessions: (
      data: {
        /**
         * @minLength 4
         * @maxLength 20
         * @pattern ^[A-Za-z0-9]*$
         */
        username: string;
        /**
         * @format password
         * @minLength 8
         */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          authToken: string;
        },
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
      >({
        path: `/sessions/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteSessions
     * @summary Log Out
     * @request DELETE:/sessions/
     * @secure
     */
    deleteSessions: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/sessions/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  languages = {
    /**
     * @description Get a list of languages
     *
     * @tags language
     * @name GetLanguages
     * @summary Get Languages
     * @request GET:/languages/
     */
    getLanguages: (
      query?: {
        isSupported?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        LanguageSchema[],
        {
          code: 400;
          status: "Bad Request";
          message: string;
          details: string;
          fields?: object;
        }
      >({
        path: `/languages/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  collections = {
    /**
     * @description Get list of collections
     *
     * @tags collections
     * @name GetCollections
     * @summary Get collections
     * @request GET:/collections/
     */
    getCollections: (
      query?: {
        /**
         * @minLength 2
         * @maxLength 4
         */
        languageCode?: string;
        /**
         * @minLength 4
         * @maxLength 20
         */
        addedBy?: string;
        searchQuery?: string;
        /** @default "title" */
        sortBy?: "title" | "createdDate" | "avgPastViewersCountPerText";
        /** @default "asc" */
        sortOrder?: "asc" | "desc";
        page?: number;
        /**
         * @min 1
         * @max 100
         * @default 10
         */
        pageSize?: number;
        level?: LanguageLevelSchema[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @min 1 */
          page: number;
          /**
           * @min 1
           * @max 100
           */
          pageSize: number;
          /** @min 0 */
          pageCount: number;
          data: CollectionSchema[];
        },
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
      >({
        path: `/collections/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new collection.
     *
     * @tags collection
     * @name PostCollections
     * @summary Create collection
     * @request POST:/collections/
     * @secure
     */
    postCollections: (
      data: {
        languageCode: string;
        title: string;
        description?: string;
        level?: LanguageLevelSchema;
        /** @format uri */
        image?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CollectionSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
      >({
        path: `/collections/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get collection details.
     *
     * @tags collection
     * @name GetCollectionsCollectionId
     * @summary Get collection
     * @request GET:/collections/{collectionId}/
     * @secure
     */
    getCollectionsCollectionId: (collectionId: number, params: RequestParams = {}) =>
      this.request<
        CollectionSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/collections/${collectionId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update collection details.
     *
     * @tags collection
     * @name PutCollectionsCollectionId
     * @summary Update collection
     * @request PUT:/collections/{collectionId}/
     * @secure
     */
    putCollectionsCollectionId: (
      collectionId: number,
      data: {
        /** @format uri */
        image?: string;
        title: string;
        description: string;
        textsOrder: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CollectionSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
        | {
            code: 413;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 415;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object;
          }
      >({
        path: `/collections/${collectionId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteCollectionsCollectionId
     * @summary Delete collection
     * @request DELETE:/collections/{collectionId}/
     * @secure
     */
    deleteCollectionsCollectionId: (collectionId: number, params: RequestParams = {}) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/collections/${collectionId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Redirects to next text in collection or 404 if not found
     *
     * @name GetCollectionsCollectionIdTextsTextIdNext
     * @summary Get Next Text In collection
     * @request GET:/collections/{collectionId}/texts/{textId}/next/
     * @secure
     */
    getCollectionsCollectionIdTextsTextIdNext: (collectionId: number, textId: number, params: RequestParams = {}) =>
      this.request<
        any,
        | void
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/collections/${collectionId}/texts/${textId}/next/`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  texts = {
    /**
     * @description Get a list of texts
     *
     * @tags text
     * @name GetTexts
     * @summary Get Texts
     * @request GET:/texts/
     * @secure
     */
    getTexts: (
      query?: {
        /**
         * @minLength 2
         * @maxLength 4
         */
        languageCode?: string;
        searchQuery?: string;
        /**
         * @minLength 4
         * @maxLength 20
         */
        addedBy?: string;
        hasAudio?: boolean;
        /** @default "title" */
        sortBy?: "title" | "createdDate" | "pastViewersCount";
        /** @default "asc" */
        sortOrder?: "asc" | "desc";
        page?: number;
        /**
         * @min 1
         * @max 100
         * @default 10
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @min 1 */
          page: number;
          /**
           * @min 1
           * @max 100
           */
          pageSize: number;
          /** @min 0 */
          pageCount: number;
          data: TextSchema[];
        },
        {
          code: 400;
          status: "Bad Request";
          message: string;
          details: string;
          fields?: object;
        }
      >({
        path: `/texts/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new text.
     *
     * @tags text
     * @name PostTexts
     * @summary Create Text
     * @request POST:/texts/
     * @secure
     */
    postTexts: (
      data: {
        title: string;
        content: string;
        languageCode: string;
        collectionId?: number | null;
        isPublic?: boolean;
        level?: LanguageLevelSchema;
        /** @format uri */
        image?: string;
        /** @format uri */
        audio?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TextSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 413;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 415;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object;
          }
      >({
        path: `/texts/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get text details.
     *
     * @tags text
     * @name GetTextsTextId
     * @summary Get Text
     * @request GET:/texts/{textId}/
     * @secure
     */
    getTextsTextId: (textId: number, params: RequestParams = {}) =>
      this.request<
        TextSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/texts/${textId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update text details.
     *
     * @tags text
     * @name PatchTextsTextId
     * @summary Update Text
     * @request PATCH:/texts/{textId}/
     * @secure
     */
    patchTextsTextId: (
      textId: number,
      data: {
        /** @format uri */
        image?: string;
        /** @format uri */
        audio?: string;
        collectionId?: number | null;
        title: string;
        content: string;
        level?: LanguageLevelSchema;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TextSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/texts/${textId}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteTextsTextId
     * @summary Delete Text
     * @request DELETE:/texts/{textId}/
     * @secure
     */
    deleteTextsTextId: (textId: number, params: RequestParams = {}) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/texts/${textId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get a list of vocabs in a text.
     *
     * @tags vocab
     * @name GetTextsTextIdVocabs
     * @summary Get Text Vocabs
     * @request GET:/texts/{textId}/vocabs/
     * @secure
     */
    getTextsTextIdVocabs: (textId: number, params: RequestParams = {}) =>
      this.request<
        LearnerVocabSchema[],
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/texts/${textId}/vocabs/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PostTextsTextIdReports
     * @summary Report text
     * @request POST:/texts/{textId}/reports/
     * @secure
     */
    postTextsTextIdReports: (
      textId: number,
      data: {
        reasonForReporting: string;
        reportText?: string;
        /** @default true */
        hideText?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/texts/${textId}/reports/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  vocabs = {
    /**
     * @description Create new vocab.
     *
     * @tags vocab
     * @name PostVocabs
     * @summary Create Vocab
     * @request POST:/vocabs/
     * @secure
     */
    postVocabs: (
      data: {
        languageCode?: string;
        text?: string;
        isPhrase?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        VocabSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/vocabs/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of saved all vocabs.
     *
     * @name GetVocabs
     * @summary Get Vocabs
     * @request GET:/vocabs/
     */
    getVocabs: (
      query?: {
        languageCode?: string;
        level?: VocabLevelSchema[];
        searchQuery?: string;
        /** @default "text" */
        sortBy?: "text" | "textsCount" | "learnersCount";
        /** @default "asc" */
        sortOrder?: "asc" | "desc";
        page?: number;
        /**
         * @min 1
         * @max 200
         * @default 25
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @min 1 */
          page: number;
          /** @min 1 */
          pageSize: number;
          /** @min 0 */
          pageCount: number;
          data: LearnerVocabSchema[];
        },
        {
          code: 400;
          status: "Bad Request";
          message: string;
          details: string;
          fields?: object;
        }
      >({
        path: `/vocabs/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name GetVocabsVocabIdHumanPronunciations
     * @summary Get Vocab Human Pronunciations
     * @request GET:/vocabs/{vocabId}/human-pronunciations/
     * @secure
     */
    getVocabsVocabIdHumanPronunciations: (vocabId: number, params: RequestParams = {}) =>
      this.request<HumanPronunciationSchema[], any>({
        path: `/vocabs/${vocabId}/human-pronunciations/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  meanings = {
    /**
     * @description Create a new meaning.
     *
     * @tags meaning
     * @name PostMeanings
     * @summary Create Meaning
     * @request POST:/meanings/
     * @secure
     */
    postMeanings: (
      data: {
        text?: string;
        vocabId?: number;
        languageCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        MeaningSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | void
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
      >({
        path: `/meanings/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  dictionaries = {
    /**
     * No description
     *
     * @name GetDictionaries
     * @summary Your GET endpoint
     * @request GET:/dictionaries/
     * @secure
     */
    getDictionaries: (
      query?: {
        languageCode?: string;
        isPronunciation?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DictionarySchema[], any>({
        path: `/dictionaries/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  passwordResetTokens = {
    /**
     * @description Request a password reset token is created and sent to user email
     *
     * @name PostPasswordResetTokens
     * @summary Request Password Reset Token
     * @request POST:/password-reset-tokens/
     * @secure
     */
    postPasswordResetTokens: (
      data: {
        username: string;
        /**
         * @format email
         * @maxLength 256
         */
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/password-reset-tokens/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Validates password reset token, returns 204 if it's valid, 401 otherwise.
     *
     * @name PostPasswordResetTokensVerify
     * @summary Validate Password Reset Token
     * @request POST:/password-reset-tokens/verify/
     * @secure
     */
    postPasswordResetTokensVerify: (
      data: {
        token: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        {
          code: 401;
          status: "Unauthorized";
          message: string;
          details: string;
        }
      >({
        path: `/password-reset-tokens/verify/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  emailConfirmTokens = {
    /**
     * @description Requests an email reset token to be sent to user email. Used for resending confirmation email. Can optionally change email from sign up. If user email is already confirmed return 400.
     *
     * @name PostEmailConfirmTokens
     * @summary Request Email Confirm Token
     * @request POST:/email-confirm-tokens/
     * @secure
     */
    postEmailConfirmTokens: (
      data: {
        /** @format email */
        email?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
      >({
        path: `/email-confirm-tokens/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  fileUploadRequests = {
    /**
     * No description
     *
     * @name PostFileUploadRequest
     * @summary Request presigned file upload url
     * @request POST:/file-upload-requests/
     * @secure
     */
    postFileUploadRequest: (
      data: {
        fileField: string;
        /**
         * @minLength 1
         * @maxLength 20
         */
        fileExtension: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uri */
          uploadUrl: string;
          uploadFormFields: object;
          objectKey: string;
        },
        any
      >({
        path: `/file-upload-requests/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  humanPronunciations = {
    /**
     * No description
     *
     * @name GetHumanPronunciations
     * @summary Get human pronunciations
     * @request GET:/human-pronunciations/
     * @secure
     */
    getHumanPronunciations: (
      query?: {
        languageCode?: string;
        text?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          page: number;
          pageSize: number;
          pageCount: number;
          data: HumanPronunciationSchema[];
        },
        any
      >({
        path: `/human-pronunciations/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  ttsPronunciations = {
    /**
     * No description
     *
     * @name PostTtsPronunciations
     * @summary Generate TTS Pronunciation
     * @request POST:/tts-pronunciations/
     * @secure
     */
    postTtsPronunciations: (
      data: {
        vocabId: number;
        voiceCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TTSPronunciationSchema,
        | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object;
          }
        | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
          }
        | {
            code: 403;
            status: string;
            message: string;
            details: string;
          }
        | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
          }
        | void
      >({
        path: `/tts-pronunciations/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  translationLanguages = {
    /**
     * No description
     *
     * @name GetTranslationLanguages
     * @summary Get translation languages
     * @request GET:/translation-languages/
     */
    getTranslationLanguages: (params: RequestParams = {}) =>
      this.request<TranslationLanguageSchema[], any>({
        path: `/translation-languages/`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
