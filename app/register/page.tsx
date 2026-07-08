"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

const initialState = {
  errors: {} as Record<string, string>,
  values: { username: "", name: "", password: "", passwordConfirmation: "" },
}


export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)
  const values = state.values ?? initialState.values
  return (
    <div className="max-w-xl mx-auto px-6 py-8">
  <div className="rounded-xl border border-gray-200 bg-gray-800 p-8 shadow-sm">
    <h1 className="mb-6 text-3xl font-bold text-gray-200">
      Register
    </h1>

    <form
      action={formAction}
      key={`${state.values?.username}-${state.values?.name}`}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-gray-500"
        >
          Username
        </label>

        <input
          id="username"
          type="text"
          name="username"
          defaultValue={values.username}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {state.errors?.username && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.username}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-500"
        >
          Name
        </label>

        <input
          id="name"
          type="text"
          name="name"
          defaultValue={values.name}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {state.errors?.name && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-500"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          name="password"
          defaultValue={values.password}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {state.errors?.password && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.password}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="passwordConfirmation"
          className="mb-2 block text-sm font-medium text-gray-500"
        >
          Confirm Password
        </label>

        <input
          id="passwordConfirmation"
          type="password"
          name="passwordConfirmation"
          defaultValue={values.passwordConfirmation}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {state.errors?.passwordConfirmation && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.passwordConfirmation}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 active:scale-95"
      >
        Create Account
      </button>
    </form>
  </div>
</div>
  )
}