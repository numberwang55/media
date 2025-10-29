import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker"

// DEV ONLY!!!
const delay = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration));
}

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      await delay(1000)
      return fetch(...args)
    }
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (res, err, user) => {
          return [{ type: "Album", id: user.id }]
        },
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id
            },
            method: "GET"
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (res, err, user) => {
          return [{ type: "Album", id: user.id }]
        },
        query: (user) => {
          return {
            url: `/albums`,
            method: "POST",
            body: {
              title: faker.commerce.productName(),
              userId: user.id,
            }
          }
        },
      }),
      deleteAlbum: builder.mutation({
        invalidatesTags: (res, err, album) => {
          return [{ type: "Album", id: album.userId }]
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE"
          }
        }
      })
    }
  }
})

export const {useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation} = albumsApi;
export {albumsApi};