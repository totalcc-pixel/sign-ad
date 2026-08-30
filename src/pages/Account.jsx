import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { User as UserIcon, Mail, Phone, Building, LogOut, Trash2, LifeBuoy, Loader2 } from "lucide-react";

export default function Account() {
  const { user, logout } = useAuth();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const uid = user?.id;
      if (uid) {
        await base44.entities.CompanyProfile.deleteMany({ created_by_id: uid });
        await base44.entities.DesignProject.deleteMany({ created_by_id: uid });
        await base44.entities.QuoteRequest.deleteMany({ created_by_id: uid });
      }
      logout("/");
    } catch (e) {
      console.error(e);
      logout("/");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 lg:pt-80 pb-16">
      <div className="max-w-2xl mx-auto px-5 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F39C12]/15 border border-[#F39C12]/30">
            <UserIcon className="w-6 h-6 text-[#F39C12]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">My Account</h1>
        </div>

        {/* User info card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#F39C12] shrink-0" />
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wide">Email</p>
              <p className="text-white font-medium">{user?.email || "—"}</p>
            </div>
          </div>
          {user?.full_name && (
            <div className="flex items-center gap-3">
              <UserIcon className="w-5 h-5 text-[#F39C12] shrink-0" />
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wide">Full Name</p>
                <p className="text-white font-medium">{user.full_name}</p>
              </div>
            </div>
          )}
          {user?.phone && (
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#F39C12] shrink-0" />
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wide">Phone</p>
                <p className="text-white font-medium">{user.phone}</p>
              </div>
            </div>
          )}
          {user?.company_name && (
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-[#F39C12] shrink-0" />
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wide">Company</p>
                <p className="text-white font-medium">{user.company_name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link to="/my-design">
            <div className="flex items-center justify-between w-full bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-[#F39C12]" />
                <span className="text-white font-medium">My Design Projects</span>
              </div>
              <span className="text-white/40">&rarr;</span>
            </div>
          </Link>

          <Link to="/contact">
            <div className="flex items-center justify-between w-full bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <LifeBuoy className="w-5 h-5 text-[#F39C12]" />
                <span className="text-white font-medium">Contact Support</span>
              </div>
              <span className="text-white/40">&rarr;</span>
            </div>
          </Link>

          <Link to="/forgot-password">
            <div className="flex items-center justify-between w-full bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F39C12]" />
                <span className="text-white font-medium">Forgot Password</span>
              </div>
              <span className="text-white/40">&rarr;</span>
            </div>
          </Link>

          <button
            onClick={() => logout("/")}
            className="flex items-center justify-between w-full bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-[#F39C12]" />
              <span className="text-white font-medium">Log Out</span>
            </div>
          </button>

          {/* Delete Account */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex items-center justify-between w-full bg-red-500/5 border border-red-500/20 rounded-xl p-5 hover:bg-red-500/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-medium">Delete My Account</span>
                </div>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-900 border-white/10">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Delete your account?</AlertDialogTitle>
                <AlertDialogDescription className="text-white/60">
                  This will permanently delete all your design projects, uploaded files, and quote
                  requests. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Yes, delete everything"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}