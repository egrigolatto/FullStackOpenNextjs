import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { generateUserToken } from "../actions/users";
import { markBlogAsRead } from "../actions/blogs";
import { getReadingList } from "../services/blogs";

export default async function MePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const currentUser = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  });

  if (!currentUser) {
    redirect("/login");
  }

  const readingList = await getReadingList();
  const unread = readingList.filter((entry) => !entry.read);
  const read = readingList.filter((entry) => entry.read);

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="rounded-xl border border-gray-200 bg-gray-800 p-8 shadow-sm">
        <h1 className="mb-4 text-3xl font-bold text-gray-200">My profile</h1>

        <div className="space-y-3 text-gray-300">
          <p>
            <span className="font-semibold text-gray-200">Name:</span> {currentUser.name}
          </p>
          <p>
            <span className="font-semibold text-gray-200">Username:</span> {currentUser.username}
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-gray-700 bg-gray-900 p-5">
          <h2 className="mb-3 text-xl font-semibold text-gray-200">Personal API token</h2>

          {currentUser.token ? (
            <div className="space-y-3">
              <p className="break-all rounded-md bg-gray-800 p-3 text-sm text-gray-300">
                {currentUser.token}
              </p>
            </div>
          ) : (
            <p className="text-gray-400">No token has been generated yet.</p>
          )}

          <form action={generateUserToken} className="mt-5">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Generate new token
            </button>
          </form>
        </div>

        <div className="mt-8 rounded-lg border border-gray-700 bg-gray-900 p-5">
          <h2 className="mb-3 text-xl font-semibold text-gray-200">Reading list</h2>

          <div className="space-y-6">
            <section>
              <h3 className="mb-3 text-lg font-semibold text-gray-200">No leídos</h3>

              {unread.length === 0 ? (
                <p className="text-gray-400">No tienes blogs sin leer.</p>
              ) : (
                <ul className="space-y-3">
                  {unread.map((entry) => (
                    <li key={entry.id} className="rounded-md bg-gray-800 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-200">{entry.blog?.titulo}</p>
                          <p className="text-sm text-gray-400">{entry.blog?.autor}</p>
                        </div>

                        <form action={markBlogAsRead}>
                          <input type="hidden" name="entryId" value={entry.id} />
                          <button
                            type="submit"
                            className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                          >
                            Marcar como leído
                          </button>
                        </form>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-gray-200">Leídos</h3>

              {read.length === 0 ? (
                <p className="text-gray-400">Aún no has marcado ningún blog como leído.</p>
              ) : (
                <ul className="space-y-3">
                  {read.map((entry) => (
                    <li key={entry.id} className="rounded-md bg-gray-800 p-3">
                      <p className="font-semibold text-gray-200">{entry.blog?.titulo}</p>
                      <p className="text-sm text-gray-400">{entry.blog?.autor}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}