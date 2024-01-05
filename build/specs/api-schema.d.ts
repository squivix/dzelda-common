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
    color: string | null;
}
export interface CourseSchema {
    id: number;
    title: string;
    description: string;
    /** @format uri */
    image: string;
    isPublic: boolean;
    language: string;
    addedBy: string;
    /** @format date-time */
    addedOn: string;
    lessons: LessonSchema[];
    vocabsByLevel?: VocabsByLevelSchema;
    isBookmarked?: boolean;
    level?: LanguageLevelSchema;
}
export interface LessonSchema {
    id: number;
    title: string;
    text: string;
    /** @format uri */
    audio: string;
    /** @format uri */
    image: string;
    course: CourseSchema;
    orderInCourse: number;
    isLastInCourse: boolean;
    /** @format date-time */
    addedOn: string;
    learnersCount: number;
    vocabsByLevel?: VocabsByLevelSchema;
    parsedTitle: string | null;
    parsedText: string | null;
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
    lessonsCount: number;
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
}
export interface DictionarySchema {
    id: number;
    name: string;
    link: string;
    language: string;
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
}
/** VocabLevel */
export declare enum VocabLevelSchema {
    IGNORED = -1,
    NEW = 0,
    LEVEL1 = 1,
    LEVEL2 = 2,
    LEVEL3 = 3,
    LEVEL4 = 4,
    LEARNED = 5,
    KNOWN = 6
}
/** LanguageLevel */
export declare enum LanguageLevelSchema {
    BEGINNER1 = "beginner1",
    BEGINNER2 = "beginner2",
    INTERMEDIATE1 = "intermediate1",
    INTERMEDIATE2 = "intermediate2",
    ADVANCED1 = "advanced1",
    ADVANCED2 = "advanced2"
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
/** LessonHistoryEntry */
export interface LessonHistoryEntrySchema {
    id: number;
    title: string;
    text: string;
    /** @format uri */
    audio: string;
    /** @format uri */
    image: string;
    course: CourseSchema;
    orderInCourse: number;
    isLastInCourse: boolean;
    /** @format date-time */
    addedOn: string;
    learnersCount: number;
    vocabsByLevel?: VocabsByLevelSchema;
    parsedTitle: string | null;
    parsedText: string | null;
    /** @format date-time */
    timeViewed: string;
    pastViewer: string;
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
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain"
}
export declare class HttpClient<SecurityDataType = unknown> {
    baseUrl: string;
    private securityData;
    private securityWorker?;
    private abortControllers;
    private customFetch;
    private baseApiParams;
    constructor(apiConfig?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    protected encodeQueryParam(key: string, value: any): string;
    protected addQueryParam(query: QueryParamsType, key: string): string;
    protected addArrayQueryParam(query: QueryParamsType, key: string): any;
    protected toQueryString(rawQuery?: QueryParamsType): string;
    protected addQueryParams(rawQuery?: QueryParamsType): string;
    private contentFormatters;
    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams;
    protected createAbortSignal: (cancelToken: CancelToken) => AbortSignal | undefined;
    abortRequest: (cancelToken: CancelToken) => void;
    request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title dzelda-api
 * @version 1.0
 * @baseUrl http://localhost:3000
 */
export declare class ApiClient<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    users: {
        /**
         * @description Create a new user.
         *
         * @tags auth, user
         * @name PostUsers
         * @summary Sign Up
         * @request POST:/users/
         */
        postUsers: (data: {
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
        }, params?: RequestParams) => Promise<HttpResponse<UserSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        }>>;
        /**
         * @description Get user details, including profile.
         *
         * @tags user
         * @name GetUsersUsername
         * @summary Get User
         * @request GET:/users/{username}/
         * @secure
         */
        getUsersUsername: (username: string, params?: RequestParams) => Promise<HttpResponse<UserSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * No description
         *
         * @name PostUsersMeEmailConfirm
         * @summary Confirm Email
         * @request POST:/users/me/email/confirm/
         */
        postUsersMeEmailConfirm: (data: {
            token: string;
        }, params?: RequestParams) => Promise<HttpResponse<void, {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        }>>;
        /**
         * No description
         *
         * @name PostUsersMePasswordReset
         * @summary Reset Password
         * @request POST:/users/me/password/reset/
         * @secure
         */
        postUsersMePasswordReset: (data: {
            token: string;
            /**
             * @format password
             * @minLength 8
             */
            newPassword: string;
        }, params?: RequestParams) => Promise<HttpResponse<void, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        }>>;
        /**
         * No description
         *
         * @name PutUsersMeEmail
         * @summary Change User Email
         * @request PUT:/users/me/email/
         * @secure
         */
        putUsersMeEmail: (data: {
            /** @format email */
            newEmail: string;
        }, params?: RequestParams) => Promise<HttpResponse<void, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        }>>;
        /**
         * No description
         *
         * @name PutUsersMePassword
         * @summary Change Password
         * @request PUT:/users/me/password/
         * @secure
         */
        putUsersMePassword: (data: {
            oldPassword: string;
            /** @minLength 8 */
            newPassword: string;
        }, params?: RequestParams) => Promise<HttpResponse<void, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        }>>;
        /**
         * @description Delete account of currently logged in user, and everything associated with it. This action cannot be undone.
         *
         * @name DeleteUsersMe
         * @summary Delete Account
         * @request DELETE:/users/me/
         * @secure
         */
        deleteUsersMe: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * No description
         *
         * @name PutUsersMeProfile
         * @summary Update User Profile
         * @request PUT:/users/me/profile/
         * @secure
         */
        putUsersMeProfile: (data: {
            data: {
                /** @maxLength 255 */
                bio: string;
            };
            /** @format binary */
            profilePicture?: File | undefined;
        }, params?: RequestParams) => Promise<HttpResponse<ProfileSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 413;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 415;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object | undefined;
        }>>;
        /**
         * @description Get a list of langauges the user is learning.
         *
         * @tags language
         * @name GetUsersUsernameLanguages
         * @summary Get User Languages
         * @request GET:/users/{username}/languages/
         * @secure
         */
        getUsersUsernameLanguages: (username: string, query?: {
            /** @default "name" */
            sortBy?: "name" | "learnersCount" | "lastOpened";
            /** @default "asc" */
            sortOrder?: "asc" | "desc";
        }, params?: RequestParams) => Promise<HttpResponse<LearnerLanguageSchema[], {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Add a language to languages the user is learning.
         *
         * @tags language
         * @name PostUsersUsernameLanguages
         * @summary Add Language To User
         * @request POST:/users/me/languages/
         * @secure
         */
        postUsersUsernameLanguages: (data: {
            languageCode?: string;
        }, params?: RequestParams) => Promise<HttpResponse<LanguageSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Updates user language last time opneed timestamp.
         *
         * @tags language
         * @name PatchUsersMeLanguagesLanguageCode
         * @summary Update User Language
         * @request PATCH:/users/me/languages/{languageCode}/
         * @secure
         */
        patchUsersMeLanguagesLanguageCode: (languageCode: string, data: {
            lastOpened?: "now";
        }, params?: RequestParams) => Promise<HttpResponse<LanguageSchema, void | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Remove a language from list of languages the user is learning.
         *
         * @tags language
         * @name DeleteUsersMeLanguagesLanguageCode
         * @summary Delete Language From User
         * @request DELETE:/users/me/languages/{languageCode}/
         * @secure
         */
        deleteUsersMeLanguagesLanguageCode: (languageCode: string, params?: RequestParams) => Promise<HttpResponse<void, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * No description
         *
         * @name DeleteUsersMeLanguagesLanguageCodeProgress
         * @summary Reset Language Progress
         * @request DELETE:/users/me/languages/{languageCode}/progress/
         * @secure
         */
        deleteUsersMeLanguagesLanguageCodeProgress: (languageCode: string, params?: RequestParams) => Promise<HttpResponse<void, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Get the list of courses the user has bookmarked.
         *
         * @tags course
         * @name GetUsersMeCoursesBookmarked
         * @summary Get User Courses Bookmarked
         * @request GET:/users/me/courses/bookmarked/
         * @secure
         */
        getUsersMeCoursesBookmarked: (query?: {
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
            sortBy?: "title" | "createdDate" | "avgPastViewersCountPerLesson";
            /** @default "asc" */
            sortOrder?: "asc" | "desc";
            level?: LanguageLevelSchema[];
        }, params?: RequestParams) => Promise<HttpResponse<{
            /** @min 1 */
            page: number;
            /** @min 1 */
            pageSize: number;
            /** @min 0 */
            pageCount: number;
            data: CourseSchema[];
        }, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * No description
         *
         * @name PostUsersMeCoursesBookmarked
         * @summary Add Courses to User Bookmarks
         * @request POST:/users/me/courses/bookmarked/
         * @secure
         */
        postUsersMeCoursesBookmarked: (data: {
            /** @min 0 */
            courseId: number;
        }, params?: RequestParams) => Promise<HttpResponse<CourseSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        }>>;
        /**
         * No description
         *
         * @name DeleteUsersMeCoursesBookmarkedCourseId
         * @summary Remove Course from User Bookmarks
         * @request DELETE:/users/me/courses/bookmarked/{courseId}/
         * @secure
         */
        deleteUsersMeCoursesBookmarkedCourseId: (courseId: number, params?: RequestParams) => Promise<HttpResponse<void, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Get the list of lessons the user has viewed.
         *
         * @tags lesson
         * @name GetUsersMeLessonsHistory
         * @summary Get User Lessons History
         * @request GET:/users/me/lessons/history/
         * @secure
         */
        getUsersMeLessonsHistory: (query?: {
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
            sortBy?: "title" | "createdDate" | "pastViewersCount";
            /** @default "asc" */
            sortOrder?: "asc" | "desc";
        }, params?: RequestParams) => Promise<HttpResponse<{
            /** @min 1 */
            page: number;
            /**
             * @min 1
             * @max 100
             */
            pageSize: number;
            /** @min 0 */
            pageCount: number;
            data: LessonSchema[];
        }, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Add a lesson to user lesson history
         *
         * @tags lesson
         * @name PostUsersMeLessonsHistory
         * @summary Add Lesson To User History
         * @request POST:/users/me/lessons/history/
         * @secure
         */
        postUsersMeLessonsHistory: (data: {
            lessonId?: number;
        }, params?: RequestParams) => Promise<HttpResponse<LessonSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        }>>;
        /**
         * @description Get list of saved user vocabs.
         *
         * @tags vocab
         * @name GetUsersMeVocabs
         * @summary Get User Vocabs
         * @request GET:/users/me/vocabs/
         * @secure
         */
        getUsersMeVocabs: (query?: {
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
            sortBy?: "text" | "lessonsCount" | "learnersCount";
            /** @default "asc" */
            sortOrder?: "asc" | "desc";
        }, params?: RequestParams) => Promise<HttpResponse<{
            /** @min 1 */
            page?: number | undefined;
            /**
             * @min 1
             * @max 100
             */
            pageSize?: number | undefined;
            /** @min 0 */
            pageCount?: number | undefined;
            data?: LearnerVocabSchema[] | undefined;
        }, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        }>>;
        /**
         * No description
         *
         * @name PostUsersMeVocabs
         * @summary Add Vocab To User
         * @request POST:/users/me/vocabs/
         * @secure
         */
        postUsersMeVocabs: (data: {
            vocabId?: number;
        }, params?: RequestParams) => Promise<HttpResponse<LearnerVocabSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        }>>;
        /**
         * @description Update user saved vocab details (level, notes).
         *
         * @tags vocab
         * @name PatchUsersMeVocabsVocabId
         * @summary Update User Vocab
         * @request PATCH:/users/me/vocabs/{vocabId}/
         * @secure
         */
        patchUsersMeVocabsVocabId: (vocabId: number, data: {
            level?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;
            notes?: string;
        }, params?: RequestParams) => Promise<HttpResponse<LearnerVocabSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Get user vocab details.
         *
         * @tags vocab
         * @name GetUsersMeVocabsVocabId
         * @summary Get User Vocab
         * @request GET:/users/me/vocabs/{vocabId}/
         * @secure
         */
        getUsersMeVocabsVocabId: (vocabId: number, params?: RequestParams) => Promise<HttpResponse<LearnerVocabSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * No description
         *
         * @name DeleteUsersMeVocabsVocabId
         * @summary Delete User Vocab
         * @request DELETE:/users/me/vocabs/{vocabId}/
         * @secure
         */
        deleteUsersMeVocabsVocabId: (vocabId: number, params?: RequestParams) => Promise<HttpResponse<void, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Get a list of saved user meanings.
         *
         * @tags meaning
         * @name GetUsersMeMeanings
         * @summary Get User Meanings
         * @request GET:/users/me/meanings/
         * @secure
         */
        getUsersMeMeanings: (query?: {
            vocabId?: number;
            /** @default "text" */
            sortBy?: "text" | "learnersCount";
            /** @default "asc" */
            sortOrder?: "asc" | "desc";
        }, params?: RequestParams) => Promise<HttpResponse<MeaningSchema[], {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        }>>;
        /**
         * @description Adds a meaning to the saved user meanings.
         *
         * @tags meaning
         * @name PostUsersMeMeanings
         * @summary Add Meaning To User
         * @request POST:/users/me/meanings/
         * @secure
         */
        postUsersMeMeanings: (data: {
            meaningId?: number;
        }, params?: RequestParams) => Promise<HttpResponse<MeaningSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Removes meaning from list of saved user meanings.
         *
         * @tags meaning
         * @name DeleteUsersMeMeaningsMeaningId
         * @summary Remove Meaning From User
         * @request DELETE:/users/me/meanings/{meaningId}/
         * @secure
         */
        deleteUsersMeMeaningsMeaningId: (meaningId: number, params?: RequestParams) => Promise<HttpResponse<void, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Gets a list of user dictionaries.
         *
         * @tags dictionary
         * @name GetUsersMeDictionaries
         * @summary Get User Dictionaries
         * @request GET:/users/me/dictionaries/
         * @secure
         */
        getUsersMeDictionaries: (query?: {
            languageCode?: string;
        }, params?: RequestParams) => Promise<HttpResponse<DictionarySchema[], {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Get a count of vocabs saved by a user, optionally grouped by language
         *
         * @name GetUsersUsernameVocabsSavedCount
         * @summary Get User Saved Vocabs Count
         * @request GET:/users/{username}/vocabs/saved/count/
         * @secure
         */
        getUsersUsernameVocabsSavedCount: (username: string, query?: {
            /** @format date */
            savedOnFrom?: string;
            /** @format date */
            savedOnTo?: string;
            level?: VocabLevelSchema[];
            isPhrase?: boolean;
            groupBy?: "language";
        }, params?: RequestParams) => Promise<HttpResponse<{
            vocabsCount: number;
            language?: string | undefined;
        }[], {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Get a count of vocabs saved by a user every `savedOnInterval` between `savedOnFrom` and `savedOnTo`, optionally grouped by language
         *
         * @name GetUsersUsernameVocabsSavedCountTimeSeries
         * @summary Get Saved Vocabs Count Time Series
         * @request GET:/users/{username}/vocabs/saved/count/time-series/
         * @secure
         */
        getUsersUsernameVocabsSavedCountTimeSeries: (username: string, query?: {
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
        }, params?: RequestParams) => Promise<HttpResponse<{
            vocabsCount: number;
            language?: string | undefined;
            /** @format date */
            date?: string | undefined;
        }[], {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
    };
    sessions: {
        /**
         * @description Authenticate the user
         *
         * @tags auth
         * @name PostSessions
         * @summary Login
         * @request POST:/sessions/
         */
        postSessions: (data: {
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
        }, params?: RequestParams) => Promise<HttpResponse<{
            authToken: string;
        }, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        }>>;
        /**
         * No description
         *
         * @name DeleteSessions
         * @summary Log Out
         * @request DELETE:/sessions/
         * @secure
         */
        deleteSessions: (params?: RequestParams) => Promise<HttpResponse<void, void>>;
    };
    languages: {
        /**
         * @description Get a list of languages
         *
         * @tags language
         * @name GetLanguages
         * @summary Get Languages
         * @request GET:/languages/
         */
        getLanguages: (query?: {
            isSupported?: boolean;
        }, params?: RequestParams) => Promise<HttpResponse<LanguageSchema[], {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        }>>;
    };
    courses: {
        /**
         * @description Get list of courses
         *
         * @tags course
         * @name GetCourses
         * @summary Get Courses
         * @request GET:/courses/
         */
        getCourses: (query?: {
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
            sortBy?: "title" | "createdDate" | "avgPastViewersCountPerLesson";
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
        }, params?: RequestParams) => Promise<HttpResponse<{
            /** @min 1 */
            page: number;
            /**
             * @min 1
             * @max 100
             */
            pageSize: number;
            /** @min 0 */
            pageCount: number;
            data: CourseSchema[];
        }, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        }>>;
        /**
         * @description Create a new course.
         *
         * @tags course
         * @name PostCourses
         * @summary Create Course
         * @request POST:/courses/
         * @secure
         */
        postCourses: (data: {
            data?: {
                languageCode: string;
                title: string;
                description?: string | undefined;
                isPublic?: boolean | undefined;
                level?: LanguageLevelSchema | undefined;
            } | undefined;
            /** @format binary */
            image?: File | undefined;
        }, params?: RequestParams) => Promise<HttpResponse<CourseSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 413;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 415;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object | undefined;
        }>>;
        /**
         * @description Get course details.
         *
         * @tags course
         * @name GetCoursesCourseId
         * @summary Get Course
         * @request GET:/courses/{courseId}/
         * @secure
         */
        getCoursesCourseId: (courseId: number, params?: RequestParams) => Promise<HttpResponse<CourseSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Update course details.
         *
         * @tags course
         * @name PutCoursesCourseId
         * @summary Update Course
         * @request PUT:/courses/{courseId}/
         * @secure
         */
        putCoursesCourseId: (courseId: number, data: {
            /** @format binary */
            image?: File | undefined;
            data: {
                title: string;
                description: string;
                isPublic: boolean;
                lessonsOrder: number[];
            };
        }, params?: RequestParams) => Promise<HttpResponse<CourseSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        } | {
            code: 413;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 415;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object | undefined;
        }>>;
        /**
         * @description Redirects to next lesson in course or 404 if not found
         *
         * @name GetCoursesCourseIdLessonsLessonIdNext
         * @summary Get Next Lesson In Course
         * @request GET:/courses/{courseId}/lessons/{lessonId}/next/
         * @secure
         */
        getCoursesCourseIdLessonsLessonIdNext: (courseId: number, lessonId: number, params?: RequestParams) => Promise<HttpResponse<any, void | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
    };
    lessons: {
        /**
         * @description Get a list of lessons
         *
         * @tags lesson
         * @name GetLessons
         * @summary Get Lessons
         * @request GET:/lessons/
         * @secure
         */
        getLessons: (query?: {
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
        }, params?: RequestParams) => Promise<HttpResponse<{
            /** @min 1 */
            page?: number | undefined;
            /**
             * @min 1
             * @max 100
             */
            pageSize?: number | undefined;
            /** @min 0 */
            pageCount?: number | undefined;
            data?: LessonSchema[] | undefined;
        }, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        }>>;
        /**
         * @description Create a new lesson.
         *
         * @tags lesson
         * @name PostLessons
         * @summary Create Lesson
         * @request POST:/lessons/
         * @secure
         */
        postLessons: (data: {
            /** @format binary */
            image?: File | undefined;
            /** @format binary */
            audio?: File | undefined;
            data: {
                title: string;
                text: string;
                courseId: number;
            };
        }, params?: RequestParams) => Promise<HttpResponse<LessonSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 413;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 415;
            status: "Unsupported Media Type";
            message: string;
            details: string;
            fields?: object | undefined;
        }>>;
        /**
         * @description Get lesson details.
         *
         * @tags lesson
         * @name GetLessonsLessonId
         * @summary Get Lesson
         * @request GET:/lessons/{lessonId}/
         * @secure
         */
        getLessonsLessonId: (lessonId: number, params?: RequestParams) => Promise<HttpResponse<LessonSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Update lesson details.
         *
         * @tags lesson
         * @name PutLessonsLessonId
         * @summary Update Lesson
         * @request PUT:/lessons/{lessonId}/
         * @secure
         */
        putLessonsLessonId: (lessonId: number, data: {
            /** @format binary */
            image?: File | undefined;
            /** @format binary */
            audio?: File | undefined;
            data: {
                /** @min 0 */
                courseId: number;
                title: string;
                text: string;
                level?: LanguageLevelSchema;
            };
        }, params?: RequestParams) => Promise<HttpResponse<LessonSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 403;
            status: string;
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Get a list of vocabs in a lesson.
         *
         * @tags vocab
         * @name GetLessonsLessonIdVocabs
         * @summary Get Lesson Vocabs
         * @request GET:/lessons/{lessonId}/vocabs/
         * @secure
         */
        getLessonsLessonIdVocabs: (lessonId: number, params?: RequestParams) => Promise<HttpResponse<LearnerVocabSchema[], {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
    };
    vocabs: {
        /**
         * @description Create new vocab.
         *
         * @tags vocab
         * @name PostVocabs
         * @summary Create Vocab
         * @request POST:/vocabs/
         * @secure
         */
        postVocabs: (data: {
            languageCode?: string;
            text?: string;
            isPhrase?: boolean;
        }, params?: RequestParams) => Promise<HttpResponse<VocabSchema, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
        /**
         * @description Get list of saved all vocabs.
         *
         * @name GetVocabs
         * @summary Get Vocabs
         * @request GET:/vocabs/
         */
        getVocabs: (query?: {
            languageCode?: string;
            level?: VocabLevelSchema[];
            searchQuery?: string;
            /** @default "text" */
            sortBy?: "text" | "lessonsCount" | "learnersCount";
            /** @default "asc" */
            sortOrder?: "asc" | "desc";
            page?: number;
            /**
             * @min 1
             * @max 200
             * @default 25
             */
            pageSize?: number;
        }, params?: RequestParams) => Promise<HttpResponse<{
            /** @min 1 */
            page: number;
            /** @min 1 */
            pageSize: number;
            /** @min 0 */
            pageCount: number;
            data: LearnerVocabSchema[];
        }, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        }>>;
    };
    meanings: {
        /**
         * @description Create a new meaning.
         *
         * @tags meaning
         * @name PostMeanings
         * @summary Create Meaning
         * @request POST:/meanings/
         * @secure
         */
        postMeanings: (data: {
            text?: string;
            vocabId?: number;
            languageCode?: string;
        }, params?: RequestParams) => Promise<HttpResponse<MeaningSchema, void | {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 404;
            status: "Not Found";
            message: string;
            details: string;
        }>>;
    };
    dictionaries: {
        /**
         * No description
         *
         * @name GetDictionaries
         * @summary Your GET endpoint
         * @request GET:/dictionaries/
         * @secure
         */
        getDictionaries: (query?: {
            languageCode?: string;
        }, params?: RequestParams) => Promise<HttpResponse<DictionarySchema[], any>>;
    };
    passwordResetTokens: {
        /**
         * @description Request a password reset token is created and sent to user email
         *
         * @name PostPasswordResetTokens
         * @summary Request Password Reset Token
         * @request POST:/password-reset-tokens/
         * @secure
         */
        postPasswordResetTokens: (data: {
            username: string;
            /**
             * @format email
             * @maxLength 256
             */
            email: string;
        }, params?: RequestParams) => Promise<HttpResponse<void, any>>;
        /**
         * @description Validates password reset token, returns 204 if it's valid, 401 otherwise.
         *
         * @name PostPasswordResetTokensVerify
         * @summary Validate Password Reset Token
         * @request POST:/password-reset-tokens/verify/
         * @secure
         */
        postPasswordResetTokensVerify: (data: {
            token: string;
        }, params?: RequestParams) => Promise<HttpResponse<void, {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        }>>;
    };
    emailConfirmTokens: {
        /**
         * @description Requests an email reset token to be sent to user email. Used for resending confirmation email. Can optionally change email from sign up. If user email is already confirmed return 400.
         *
         * @name PostEmailConfirmTokens
         * @summary Request Email Confirm Token
         * @request POST:/email-confirm-tokens/
         * @secure
         */
        postEmailConfirmTokens: (data: {
            /** @format email */
            email?: string;
        }, params?: RequestParams) => Promise<HttpResponse<void, {
            code: 400;
            status: "Bad Request";
            message: string;
            details: string;
            fields?: object | undefined;
        } | {
            code: 401;
            status: "Unauthorized";
            message: string;
            details: string;
        }>>;
    };
}
export {};
