import { User, Mail, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-text mb-6">Profile</h1>

      <div className="border border-border rounded-2xl bg-surface p-6 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2 rounded-full">
            <User size={20} />
          </div>
          <div>
            <p className="text-sm text-muted">Name</p>
            <p className="font-medium text-text">{user.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2 rounded-full">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-sm text-muted">Email</p>
            <p className="font-medium text-text">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2 rounded-full">
            <Shield size={20} />
          </div>
          <div>
            <p className="text-sm text-muted">Role</p>
            <p className="font-medium text-text">{user.role === "ADMIN" ? "Administrator" : "Traveler"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}