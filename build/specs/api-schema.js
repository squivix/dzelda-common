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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/** VocabLevel */
export var VocabLevelSchema;
(function (VocabLevelSchema) {
    VocabLevelSchema[VocabLevelSchema["IGNORED"] = -1] = "IGNORED";
    VocabLevelSchema[VocabLevelSchema["NEW"] = 0] = "NEW";
    VocabLevelSchema[VocabLevelSchema["LEVEL1"] = 1] = "LEVEL1";
    VocabLevelSchema[VocabLevelSchema["LEVEL2"] = 2] = "LEVEL2";
    VocabLevelSchema[VocabLevelSchema["LEVEL3"] = 3] = "LEVEL3";
    VocabLevelSchema[VocabLevelSchema["LEVEL4"] = 4] = "LEVEL4";
    VocabLevelSchema[VocabLevelSchema["LEARNED"] = 5] = "LEARNED";
    VocabLevelSchema[VocabLevelSchema["KNOWN"] = 6] = "KNOWN";
})(VocabLevelSchema || (VocabLevelSchema = {}));
/** LanguageLevel */
export var LanguageLevelSchema;
(function (LanguageLevelSchema) {
    LanguageLevelSchema["BEGINNER1"] = "beginner1";
    LanguageLevelSchema["BEGINNER2"] = "beginner2";
    LanguageLevelSchema["INTERMEDIATE1"] = "intermediate1";
    LanguageLevelSchema["INTERMEDIATE2"] = "intermediate2";
    LanguageLevelSchema["ADVANCED1"] = "advanced1";
    LanguageLevelSchema["ADVANCED2"] = "advanced2";
})(LanguageLevelSchema || (LanguageLevelSchema = {}));
export var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
    ContentType["Text"] = "text/plain";
})(ContentType || (ContentType = {}));
export class HttpClient {
    constructor(apiConfig = {}) {
        this.baseUrl = "http://localhost:3000";
        this.securityData = null;
        this.abortControllers = new Map();
        this.customFetch = (...fetchParams) => fetch(...fetchParams);
        this.baseApiParams = {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer",
        };
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.contentFormatters = {
            [ContentType.Json]: (input) => input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
            [ContentType.Text]: (input) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
            [ContentType.FormData]: (input) => Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key];
                formData.append(key, property instanceof Blob
                    ? property
                    : typeof property === "object" && property !== null
                        ? JSON.stringify(property)
                        : `${property}`);
                return formData;
            }, new FormData()),
            [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
        };
        this.createAbortSignal = (cancelToken) => {
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
        this.abortRequest = (cancelToken) => {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                this.abortControllers.delete(cancelToken);
            }
        };
        this.request = async (_a) => {
            var { body, secure, path, type, query, format, baseUrl, cancelToken } = _a, params = __rest(_a, ["body", "secure", "path", "type", "query", "format", "baseUrl", "cancelToken"]);
            const secureParams = ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
                {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const queryString = query && this.toQueryString(query);
            const payloadFormatter = this.contentFormatters[type || ContentType.Json];
            const responseFormat = format || requestParams.format;
            return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, Object.assign(Object.assign({}, requestParams), { headers: Object.assign(Object.assign({}, (requestParams.headers || {})), (type && type !== ContentType.FormData ? { "Content-Type": type } : {})), signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null, body: typeof body === "undefined" || body === null ? null : payloadFormatter(body) })).then(async (response) => {
                const r = response;
                r.data = null;
                r.error = null;
                const data = !responseFormat
                    ? r
                    : await response[responseFormat]()
                        .then((data) => {
                        if (r.ok) {
                            r.data = data;
                        }
                        else {
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
        Object.assign(this, apiConfig);
    }
    encodeQueryParam(key, value) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }
    addQueryParam(query, key) {
        return this.encodeQueryParam(key, query[key]);
    }
    addArrayQueryParam(query, key) {
        const value = query[key];
        return value.map((v) => this.encodeQueryParam(key, v)).join("&");
    }
    toQueryString(rawQuery) {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
            .join("&");
    }
    addQueryParams(rawQuery) {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }
    mergeRequestParams(params1, params2) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, this.baseApiParams), params1), (params2 || {})), { headers: Object.assign(Object.assign(Object.assign({}, (this.baseApiParams.headers || {})), (params1.headers || {})), ((params2 && params2.headers) || {})) });
    }
}
/**
 * @title dzelda-api
 * @version 1.0
 * @baseUrl http://localhost:3000
 */
export class ApiClient extends HttpClient {
    constructor() {
        super(...arguments);
        this.users = {
            /**
             * @description Create a new user.
             *
             * @tags auth, user
             * @name PostUsers
             * @summary Sign Up
             * @request POST:/users/
             */
            postUsers: (data, params = {}) => this.request(Object.assign({ path: `/users/`, method: "POST", body: data, type: ContentType.Json, format: "json" }, params)),
            /**
             * @description Get user details, including profile.
             *
             * @tags user
             * @name GetUsersUsername
             * @summary Get User
             * @request GET:/users/{username}/
             * @secure
             */
            getUsersUsername: (username, params = {}) => this.request(Object.assign({ path: `/users/${username}/`, method: "GET", secure: true, format: "json" }, params)),
            /**
             * No description
             *
             * @name PostUsersMeEmailConfirm
             * @summary Confirm Email
             * @request POST:/users/me/email/confirm/
             */
            postUsersMeEmailConfirm: (data, params = {}) => this.request(Object.assign({ path: `/users/me/email/confirm/`, method: "POST", body: data, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @name PostUsersMePasswordReset
             * @summary Reset Password
             * @request POST:/users/me/password/reset/
             * @secure
             */
            postUsersMePasswordReset: (data, params = {}) => this.request(Object.assign({ path: `/users/me/password/reset/`, method: "POST", body: data, secure: true, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @name PutUsersMeEmail
             * @summary Change User Email
             * @request PUT:/users/me/email/
             * @secure
             */
            putUsersMeEmail: (data, params = {}) => this.request(Object.assign({ path: `/users/me/email/`, method: "PUT", body: data, secure: true, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @name PutUsersMePassword
             * @summary Change Password
             * @request PUT:/users/me/password/
             * @secure
             */
            putUsersMePassword: (data, params = {}) => this.request(Object.assign({ path: `/users/me/password/`, method: "PUT", body: data, secure: true, type: ContentType.Json }, params)),
            /**
             * @description Delete account of currently logged in user, and everything associated with it. This action cannot be undone.
             *
             * @name DeleteUsersMe
             * @summary Delete Account
             * @request DELETE:/users/me/
             * @secure
             */
            deleteUsersMe: (params = {}) => this.request(Object.assign({ path: `/users/me/`, method: "DELETE", secure: true }, params)),
            /**
             * No description
             *
             * @name PutUsersMeProfile
             * @summary Update User Profile
             * @request PUT:/users/me/profile/
             * @secure
             */
            putUsersMeProfile: (data, params = {}) => this.request(Object.assign({ path: `/users/me/profile/`, method: "PUT", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * @description Get a list of langauges the user is learning.
             *
             * @tags language
             * @name GetUsersUsernameLanguages
             * @summary Get User Languages
             * @request GET:/users/{username}/languages/
             * @secure
             */
            getUsersUsernameLanguages: (username, query, params = {}) => this.request(Object.assign({ path: `/users/${username}/languages/`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * @description Add a language to languages the user is learning.
             *
             * @tags language
             * @name PostUsersUsernameLanguages
             * @summary Add Language To User
             * @request POST:/users/me/languages/
             * @secure
             */
            postUsersUsernameLanguages: (data, params = {}) => this.request(Object.assign({ path: `/users/me/languages/`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * @description Updates user language last time opneed timestamp.
             *
             * @tags language
             * @name PatchUsersMeLanguagesLanguageCode
             * @summary Update User Language
             * @request PATCH:/users/me/languages/{languageCode}/
             * @secure
             */
            patchUsersMeLanguagesLanguageCode: (languageCode, data, params = {}) => this.request(Object.assign({ path: `/users/me/languages/${languageCode}/`, method: "PATCH", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * @description Remove a language from list of languages the user is learning.
             *
             * @tags language
             * @name DeleteUsersMeLanguagesLanguageCode
             * @summary Delete Language From User
             * @request DELETE:/users/me/languages/{languageCode}/
             * @secure
             */
            deleteUsersMeLanguagesLanguageCode: (languageCode, params = {}) => this.request(Object.assign({ path: `/users/me/languages/${languageCode}/`, method: "DELETE", secure: true }, params)),
            /**
             * No description
             *
             * @name DeleteUsersMeLanguagesLanguageCodeProgress
             * @summary Reset Language Progress
             * @request DELETE:/users/me/languages/{languageCode}/progress/
             * @secure
             */
            deleteUsersMeLanguagesLanguageCodeProgress: (languageCode, params = {}) => this.request(Object.assign({ path: `/users/me/languages/${languageCode}/progress/`, method: "DELETE", secure: true }, params)),
            /**
             * @description Get the list of courses the user has bookmarked.
             *
             * @tags course
             * @name GetUsersMeCoursesBookmarked
             * @summary Get User Courses Bookmarked
             * @request GET:/users/me/courses/bookmarked/
             * @secure
             */
            getUsersMeCoursesBookmarked: (query, params = {}) => this.request(Object.assign({ path: `/users/me/courses/bookmarked/`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * No description
             *
             * @name PostUsersMeCoursesBookmarked
             * @summary Add Courses to User Bookmarks
             * @request POST:/users/me/courses/bookmarked/
             * @secure
             */
            postUsersMeCoursesBookmarked: (data, params = {}) => this.request(Object.assign({ path: `/users/me/courses/bookmarked/`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @name DeleteUsersMeCoursesBookmarkedCourseId
             * @summary Remove Course from User Bookmarks
             * @request DELETE:/users/me/courses/bookmarked/{courseId}/
             * @secure
             */
            deleteUsersMeCoursesBookmarkedCourseId: (courseId, params = {}) => this.request(Object.assign({ path: `/users/me/courses/bookmarked/${courseId}/`, method: "DELETE", secure: true }, params)),
            /**
             * @description Get the list of lessons the user has viewed.
             *
             * @tags lesson
             * @name GetUsersMeLessonsHistory
             * @summary Get User Lessons History
             * @request GET:/users/me/lessons/history/
             * @secure
             */
            getUsersMeLessonsHistory: (query, params = {}) => this.request(Object.assign({ path: `/users/me/lessons/history/`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * @description Add a lesson to user lesson history
             *
             * @tags lesson
             * @name PostUsersMeLessonsHistory
             * @summary Add Lesson To User History
             * @request POST:/users/me/lessons/history/
             * @secure
             */
            postUsersMeLessonsHistory: (data, params = {}) => this.request(Object.assign({ path: `/users/me/lessons/history/`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * @description Get list of saved user vocabs.
             *
             * @tags vocab
             * @name GetUsersMeVocabs
             * @summary Get User Vocabs
             * @request GET:/users/me/vocabs/
             * @secure
             */
            getUsersMeVocabs: (query, params = {}) => this.request(Object.assign({ path: `/users/me/vocabs/`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * No description
             *
             * @name PostUsersMeVocabs
             * @summary Add Vocab To User
             * @request POST:/users/me/vocabs/
             * @secure
             */
            postUsersMeVocabs: (data, params = {}) => this.request(Object.assign({ path: `/users/me/vocabs/`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * @description Update user saved vocab details (level, notes).
             *
             * @tags vocab
             * @name PatchUsersMeVocabsVocabId
             * @summary Update User Vocab
             * @request PATCH:/users/me/vocabs/{vocabId}/
             * @secure
             */
            patchUsersMeVocabsVocabId: (vocabId, data, params = {}) => this.request(Object.assign({ path: `/users/me/vocabs/${vocabId}/`, method: "PATCH", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * @description Get user vocab details.
             *
             * @tags vocab
             * @name GetUsersMeVocabsVocabId
             * @summary Get User Vocab
             * @request GET:/users/me/vocabs/{vocabId}/
             * @secure
             */
            getUsersMeVocabsVocabId: (vocabId, params = {}) => this.request(Object.assign({ path: `/users/me/vocabs/${vocabId}/`, method: "GET", secure: true, format: "json" }, params)),
            /**
             * No description
             *
             * @name DeleteUsersMeVocabsVocabId
             * @summary Delete User Vocab
             * @request DELETE:/users/me/vocabs/{vocabId}/
             * @secure
             */
            deleteUsersMeVocabsVocabId: (vocabId, params = {}) => this.request(Object.assign({ path: `/users/me/vocabs/${vocabId}/`, method: "DELETE", secure: true }, params)),
            /**
             * @description Get a list of saved user meanings.
             *
             * @tags meaning
             * @name GetUsersMeMeanings
             * @summary Get User Meanings
             * @request GET:/users/me/meanings/
             * @secure
             */
            getUsersMeMeanings: (query, params = {}) => this.request(Object.assign({ path: `/users/me/meanings/`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * @description Adds a meaning to the saved user meanings.
             *
             * @tags meaning
             * @name PostUsersMeMeanings
             * @summary Add Meaning To User
             * @request POST:/users/me/meanings/
             * @secure
             */
            postUsersMeMeanings: (data, params = {}) => this.request(Object.assign({ path: `/users/me/meanings/`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * @description Removes meaning from list of saved user meanings.
             *
             * @tags meaning
             * @name DeleteUsersMeMeaningsMeaningId
             * @summary Remove Meaning From User
             * @request DELETE:/users/me/meanings/{meaningId}/
             * @secure
             */
            deleteUsersMeMeaningsMeaningId: (meaningId, params = {}) => this.request(Object.assign({ path: `/users/me/meanings/${meaningId}/`, method: "DELETE", secure: true }, params)),
            /**
             * @description Gets a list of user dictionaries.
             *
             * @tags dictionary
             * @name GetUsersMeDictionaries
             * @summary Get User Dictionaries
             * @request GET:/users/me/dictionaries/
             * @secure
             */
            getUsersMeDictionaries: (query, params = {}) => this.request(Object.assign({ path: `/users/me/dictionaries/`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * @description Get a count of vocabs saved by a user, optionally grouped by language
             *
             * @name GetUsersUsernameVocabsSavedCount
             * @summary Get User Saved Vocabs Count
             * @request GET:/users/{username}/vocabs/saved/count/
             * @secure
             */
            getUsersUsernameVocabsSavedCount: (username, query, params = {}) => this.request(Object.assign({ path: `/users/${username}/vocabs/saved/count/`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * @description Get a count of vocabs saved by a user every `savedOnInterval` between `savedOnFrom` and `savedOnTo`, optionally grouped by language
             *
             * @name GetUsersUsernameVocabsSavedCountTimeSeries
             * @summary Get Saved Vocabs Count Time Series
             * @request GET:/users/{username}/vocabs/saved/count/time-series/
             * @secure
             */
            getUsersUsernameVocabsSavedCountTimeSeries: (username, query, params = {}) => this.request(Object.assign({ path: `/users/${username}/vocabs/saved/count/time-series/`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * No description
             *
             * @name PutUsersMeLanguagesLanguageCodeDictionaries
             * @summary Update user language dictionaries
             * @request PUT:/users/me/languages/:languageCode/dictionaries/
             * @secure
             */
            putUsersMeLanguagesLanguageCodeDictionaries: (languageCode, data, params = {}) => this.request(Object.assign({ path: `/users/me/languages/${languageCode}/dictionaries/`, method: "PUT", body: data, secure: true, type: ContentType.Json }, params)),
        };
        this.sessions = {
            /**
             * @description Authenticate the user
             *
             * @tags auth
             * @name PostSessions
             * @summary Login
             * @request POST:/sessions/
             */
            postSessions: (data, params = {}) => this.request(Object.assign({ path: `/sessions/`, method: "POST", body: data, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @name DeleteSessions
             * @summary Log Out
             * @request DELETE:/sessions/
             * @secure
             */
            deleteSessions: (params = {}) => this.request(Object.assign({ path: `/sessions/`, method: "DELETE", secure: true }, params)),
        };
        this.languages = {
            /**
             * @description Get a list of languages
             *
             * @tags language
             * @name GetLanguages
             * @summary Get Languages
             * @request GET:/languages/
             */
            getLanguages: (query, params = {}) => this.request(Object.assign({ path: `/languages/`, method: "GET", query: query, format: "json" }, params)),
        };
        this.courses = {
            /**
             * @description Get list of courses
             *
             * @tags course
             * @name GetCourses
             * @summary Get Courses
             * @request GET:/courses/
             */
            getCourses: (query, params = {}) => this.request(Object.assign({ path: `/courses/`, method: "GET", query: query, format: "json" }, params)),
            /**
             * @description Create a new course.
             *
             * @tags course
             * @name PostCourses
             * @summary Create Course
             * @request POST:/courses/
             * @secure
             */
            postCourses: (data, params = {}) => this.request(Object.assign({ path: `/courses/`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * @description Get course details.
             *
             * @tags course
             * @name GetCoursesCourseId
             * @summary Get Course
             * @request GET:/courses/{courseId}/
             * @secure
             */
            getCoursesCourseId: (courseId, params = {}) => this.request(Object.assign({ path: `/courses/${courseId}/`, method: "GET", secure: true, format: "json" }, params)),
            /**
             * @description Update course details.
             *
             * @tags course
             * @name PutCoursesCourseId
             * @summary Update Course
             * @request PUT:/courses/{courseId}/
             * @secure
             */
            putCoursesCourseId: (courseId, data, params = {}) => this.request(Object.assign({ path: `/courses/${courseId}/`, method: "PUT", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @name DeleteCoursesCourseId
             * @summary Delete Course
             * @request DELETE:/courses/{courseId}/
             * @secure
             */
            deleteCoursesCourseId: (courseId, params = {}) => this.request(Object.assign({ path: `/courses/${courseId}/`, method: "DELETE", secure: true }, params)),
            /**
             * @description Redirects to next lesson in course or 404 if not found
             *
             * @name GetCoursesCourseIdLessonsLessonIdNext
             * @summary Get Next Lesson In Course
             * @request GET:/courses/{courseId}/lessons/{lessonId}/next/
             * @secure
             */
            getCoursesCourseIdLessonsLessonIdNext: (courseId, lessonId, params = {}) => this.request(Object.assign({ path: `/courses/${courseId}/lessons/${lessonId}/next/`, method: "GET", secure: true }, params)),
        };
        this.lessons = {
            /**
             * @description Get a list of lessons
             *
             * @tags lesson
             * @name GetLessons
             * @summary Get Lessons
             * @request GET:/lessons/
             * @secure
             */
            getLessons: (query, params = {}) => this.request(Object.assign({ path: `/lessons/`, method: "GET", query: query, secure: true, format: "json" }, params)),
            /**
             * @description Create a new lesson.
             *
             * @tags lesson
             * @name PostLessons
             * @summary Create Lesson
             * @request POST:/lessons/
             * @secure
             */
            postLessons: (data, params = {}) => this.request(Object.assign({ path: `/lessons/`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * @description Get lesson details.
             *
             * @tags lesson
             * @name GetLessonsLessonId
             * @summary Get Lesson
             * @request GET:/lessons/{lessonId}/
             * @secure
             */
            getLessonsLessonId: (lessonId, params = {}) => this.request(Object.assign({ path: `/lessons/${lessonId}/`, method: "GET", secure: true, format: "json" }, params)),
            /**
             * @description Update lesson details.
             *
             * @tags lesson
             * @name PatchLessonsLessonId
             * @summary Update Lesson
             * @request PATCH:/lessons/{lessonId}/
             * @secure
             */
            patchLessonsLessonId: (lessonId, data, params = {}) => this.request(Object.assign({ path: `/lessons/${lessonId}/`, method: "PATCH", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @name DeleteLessonsLessonId
             * @summary Delete Lesson
             * @request DELETE:/lessons/{lessonId}/
             * @secure
             */
            deleteLessonsLessonId: (lessonId, params = {}) => this.request(Object.assign({ path: `/lessons/${lessonId}/`, method: "DELETE", secure: true }, params)),
            /**
             * @description Get a list of vocabs in a lesson.
             *
             * @tags vocab
             * @name GetLessonsLessonIdVocabs
             * @summary Get Lesson Vocabs
             * @request GET:/lessons/{lessonId}/vocabs/
             * @secure
             */
            getLessonsLessonIdVocabs: (lessonId, params = {}) => this.request(Object.assign({ path: `/lessons/${lessonId}/vocabs/`, method: "GET", secure: true, format: "json" }, params)),
        };
        this.vocabs = {
            /**
             * @description Create new vocab.
             *
             * @tags vocab
             * @name PostVocabs
             * @summary Create Vocab
             * @request POST:/vocabs/
             * @secure
             */
            postVocabs: (data, params = {}) => this.request(Object.assign({ path: `/vocabs/`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
            /**
             * @description Get list of saved all vocabs.
             *
             * @name GetVocabs
             * @summary Get Vocabs
             * @request GET:/vocabs/
             */
            getVocabs: (query, params = {}) => this.request(Object.assign({ path: `/vocabs/`, method: "GET", query: query, format: "json" }, params)),
            /**
             * No description
             *
             * @name GetVocabsVocabIdHumanPronunciations
             * @summary Get Vocab Human Pronunciations
             * @request GET:/vocabs/{vocabId}/human-pronunciations/
             * @secure
             */
            getVocabsVocabIdHumanPronunciations: (vocabId, params = {}) => this.request(Object.assign({ path: `/vocabs/${vocabId}/human-pronunciations/`, method: "GET", secure: true, format: "json" }, params)),
        };
        this.meanings = {
            /**
             * @description Create a new meaning.
             *
             * @tags meaning
             * @name PostMeanings
             * @summary Create Meaning
             * @request POST:/meanings/
             * @secure
             */
            postMeanings: (data, params = {}) => this.request(Object.assign({ path: `/meanings/`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
        };
        this.dictionaries = {
            /**
             * No description
             *
             * @name GetDictionaries
             * @summary Your GET endpoint
             * @request GET:/dictionaries/
             * @secure
             */
            getDictionaries: (query, params = {}) => this.request(Object.assign({ path: `/dictionaries/`, method: "GET", query: query, secure: true, format: "json" }, params)),
        };
        this.passwordResetTokens = {
            /**
             * @description Request a password reset token is created and sent to user email
             *
             * @name PostPasswordResetTokens
             * @summary Request Password Reset Token
             * @request POST:/password-reset-tokens/
             * @secure
             */
            postPasswordResetTokens: (data, params = {}) => this.request(Object.assign({ path: `/password-reset-tokens/`, method: "POST", body: data, secure: true, type: ContentType.Json }, params)),
            /**
             * @description Validates password reset token, returns 204 if it's valid, 401 otherwise.
             *
             * @name PostPasswordResetTokensVerify
             * @summary Validate Password Reset Token
             * @request POST:/password-reset-tokens/verify/
             * @secure
             */
            postPasswordResetTokensVerify: (data, params = {}) => this.request(Object.assign({ path: `/password-reset-tokens/verify/`, method: "POST", body: data, secure: true, type: ContentType.Json }, params)),
        };
        this.emailConfirmTokens = {
            /**
             * @description Requests an email reset token to be sent to user email. Used for resending confirmation email. Can optionally change email from sign up. If user email is already confirmed return 400.
             *
             * @name PostEmailConfirmTokens
             * @summary Request Email Confirm Token
             * @request POST:/email-confirm-tokens/
             * @secure
             */
            postEmailConfirmTokens: (data, params = {}) => this.request(Object.assign({ path: `/email-confirm-tokens/`, method: "POST", body: data, secure: true, type: ContentType.Json }, params)),
        };
        this.fileUploadRequests = {
            /**
             * No description
             *
             * @name PostFileUploadRequest
             * @summary Request presigned file upload url
             * @request POST:/file-upload-requests/
             * @secure
             */
            postFileUploadRequest: (data, params = {}) => this.request(Object.assign({ path: `/file-upload-requests/`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
        };
        this.humanPronunciations = {
            /**
             * No description
             *
             * @name GetHumanPronunciations
             * @summary Get human pronunciations
             * @request GET:/human-pronunciations/
             * @secure
             */
            getHumanPronunciations: (query, params = {}) => this.request(Object.assign({ path: `/human-pronunciations/`, method: "GET", query: query, secure: true, format: "json" }, params)),
        };
        this.ttsPronunciations = {
            /**
             * No description
             *
             * @name PostTtsPronunciations
             * @summary Generate TTS Pronunciation
             * @request POST:/tts-pronunciations/
             * @secure
             */
            postTtsPronunciations: (data, params = {}) => this.request(Object.assign({ path: `/tts-pronunciations/`, method: "POST", body: data, secure: true, type: ContentType.Json, format: "json" }, params)),
        };
    }
}
//# sourceMappingURL=api-schema.js.map