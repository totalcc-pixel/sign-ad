import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Users, Loader2 } from "lucide-react";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    base44.entities.User.list("-created_date", 200)
      .then(setUsers)
      .catch((err) => setError(err?.message || "Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-[#F39C12]" />
        <h2 className="font-display text-2xl font-bold text-black">Registered Users</h2>
        {!loading && (
          <span className="ml-auto text-sm text-zinc-500">{users.length} users</span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-zinc-400">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading users…
        </div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : users.length === 0 ? (
        <div className="text-zinc-400">No registered users yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-zinc-50">
                  <td className="px-4 py-3 font-medium text-black">
                    {u.full_name || "—"}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{u.email || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        u.role === "admin"
                          ? "bg-[#F39C12]/15 text-[#F39C12]"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {u.created_date
                      ? new Date(u.created_date).toLocaleDateString("en-NZ", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}