import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const fetchingApi = createApi({
    reducerPath: 'fetchingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api'
    }),

    endpoints: (build) => ({
        //login user
        login: build.mutation({
            query: (data) => ({
                url:'/users/login',
                method: 'POST',
                body: { ...data }
            })
        }),

        //register user
        register: build.mutation({
            query: (data) => ({
                url: '/users/register',
                method: 'POST',
                body: { ...data }
            })
        }),

        //get exercises
        getExercises: build.query({
            query: () => '/exercises'
        }),

        getSingleExercise: build.query({
            query: (exercise_id) => `/exercises/${exercise_id}`
        }),

        //get selfCare data
        getSelfCare: build.query({
            query: () => `/selfcare`
        }),

        getWorkouts: build.query({
            query: () => '/workouts'
        }),

        getSingleWorkout: build.query({
            query: (workout_id) => `/workouts/${workout_id}`
        })
    })
});

export const { useLoginMutation, useRegisterMutation, useGetExercisesQuery, useGetSingleExerciseQuery, useGetSelfCareQuery, useGetWorkoutsQuery } = fetchingApi
