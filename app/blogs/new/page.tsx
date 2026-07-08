"use client";

import { useActionState, useEffect } from "react";
import { createBlog } from "../../actions/blogs";
import { useNotification } from "../../components/NotificationContext";
import { useRouter } from "next/navigation";

const initialState = {
  errors: {} as Record<string, string>,
  values: { titulo: "", autor: "", url: "" },
  success: false,
};

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState);
  const values = state.values ?? initialState.values;

  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="max-w-xl mx-auto px-6 py-8">
      <div className="rounded-xl border border-gray-200 bg-gray-800 p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-gray-400">
          Create a new blog
        </h1>

        <form
          action={formAction}
          key={`${values.titulo}-${values.autor}-${values.url}`}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="titulo"
              className="mb-2 block text-sm font-medium text-gray-500"
            >
              Título
            </label>

            <input
              type="text"
              id="titulo"
              name="titulo"
              defaultValue={values.titulo}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {state.errors?.titulo && (
              <p className="mt-1 text-sm text-red-600">{state.errors.titulo}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="autor"
              className="mb-2 block text-sm font-medium text-gray-500"
            >
              Autor
            </label>

            <input
              type="text"
              id="autor"
              name="autor"
              defaultValue={values.autor}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {state.errors?.autor && (
              <p className="mt-1 text-sm text-red-600">{state.errors.autor}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="url"
              className="mb-2 block text-sm font-medium text-gray-500"
            >
              URL
            </label>

            <input
              type="text"
              id="url"
              name="url"
              defaultValue={values.url}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {state.errors?.url && (
              <p className="mt-1 text-sm text-red-600">{state.errors.url}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBlog;
