import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getByContext = createAsyncThunk(
  "finder/getByContext",
  async ({
    payload,
    sortBy,
    category,
  }: {
    payload: string;
    sortBy?: string;
    category?: string;
  }) => {
    const urlConstructor =
      "volumes?q=" +
      payload +
      (sortBy && "&orderBy=" + sortBy) +
      (category && "&category=" + category) +
      "&maxResults=30";
    return await api.get(urlConstructor).then(({ data }) => data);
  },
);

export const addByContext = createAsyncThunk(
  "finder/addByContext",
  async ({
    payload,
    sortBy,
    category,
    counter,
  }: {
    payload: string;
    sortBy?: string;
    category?: string;
    counter: number;
  }) => {
    const urlConstructor =
      "volumes?q=" +
      payload +
      (sortBy && "&orderBy=" + sortBy) +
      (category && "&category=" + category) +
      "&maxResults=30" +
      "&startIndex=" +
      counter * 30;
    return await api.get(urlConstructor).then(({ data }) => data);
  },
);
