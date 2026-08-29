import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon, Lock } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Image } from "@/components/ui/image";
import UsersList from "@/components/UsersList";

const CATEGORIES = ["Vehicle Graphic", "Building Sign"];

export default function AdminPortfolio() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "Vehicle Graphic",
    image_url: "",
    before_image_url: "",
    description: "",
    featured: false,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const { toast } = useToast();

  const load = () => {
    setLoading(true);
    base44.entities.Project.list("-created_date", 200)
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  if (user && user.role !== "admin") {
    return (
      <div className="pt-48 pb-20 min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <div className="w-14 h-14 rounded-full bg-zinc-200 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-zinc-500" />
          </div>
          <h1 className="font-display text-2xl font-bold text-black">Admin access only</h1>
          <p className="text-zinc-500 mt-2 text-sm">
            You need an admin account to manage the portfolio.
          </p>
        </div>
      </div>
    );
  }

  const openCreate = () => {
    setEditing(null);
    setForm({
      title: "",
      category: "Vehicle Graphic",
      image_url: "",
      before_image_url: "",
      description: "",
      featured: false,
    });
    setOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      title: p.title || "",
      category: p.category || "Vehicle Graphic",
      image_url: p.image_url || "",
      before_image_url: p.before_image_url || "",
      description: p.description || "",
      featured: !!p.featured,
    });
    setOpen(true);
  };

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await base44.integrations.Core.UploadFile({ file });
      setForm((f) => ({ ...f, image_url: res.file_url }));
      toast({ title: "Image uploaded" });
    } catch {
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const onUploadBefore = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingBefore(true);
    try {
      const res = await base44.integrations.Core.UploadFile({ file });
      setForm((f) => ({ ...f, before_image_url: res.file_url }));
      toast({ title: "Before image uploaded" });
    } catch {
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setUploadingBefore(false);
    }
  };

  const save = async () => {
    if (!form.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await base44.entities.Project.update(editing.id, form);
        toast({ title: "Project updated" });
      } else {
        await base44.entities.Project.create(form);
        toast({ title: "Project created" });
      }
      setOpen(false);
      load();
    } catch (err) {
      toast({
        title: "Save failed",
        description: err?.message || "Permission denied",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    try {
      await base44.entities.Project.delete(p.id);
      toast({ title: "Project deleted" });
      load();
    } catch (err) {
      toast({
        title: "Delete failed",
        description: err?.message || "Permission denied",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-32 lg:pt-56 pb-20 min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[#F39C12] text-sm font-semibold tracking-[0.2em] uppercase">
              Admin
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-black mt-1">
              Portfolio Management
            </h1>
            <p className="text-zinc-500 mt-2">Add, edit, and remove portfolio projects.</p>
          </div>
          <Button
            onClick={openCreate}
            className="bg-black text-white hover:bg-zinc-800 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Project
          </Button>
        </div>

        {loading ? (
          <div className="text-zinc-400">Loading…</div>
        ) : projects.length === 0 ? (
          <div className="text-zinc-400">No projects yet. Click “Add Project” to start.</div>
        ) : (
          <div className="grid gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 bg-white rounded-xl border border-zinc-200 p-3 shadow-sm"
              >
                <div className="w-24 h-20 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt={p.title}
                      className="w-full h-full"
                      fittingType="fill"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-300">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-black truncate">{p.title}</h3>
                    {p.featured && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F39C12]/15 text-[#F39C12]">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 mt-1">
                    {p.category}
                  </span>
                  {p.description && (
                    <p className="text-sm text-zinc-500 mt-1 line-clamp-1">{p.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm" onClick={() => openEdit(p)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => remove(p)}
                    className="text-red-600 hover:text-red-700 border-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Project" : "Add Project"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Project title"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Image</Label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-100 hover:bg-zinc-200 text-sm font-medium transition-colors">
                  <Upload className="w-4 h-4" /> {uploading ? "Uploading…" : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onUpload}
                    disabled={uploading}
                  />
                </label>
                {form.image_url && (
                  <div className="w-16 h-12 rounded overflow-hidden bg-zinc-100">
                    <Image
                      src={form.image_url}
                      alt="preview"
                      className="w-full h-full"
                      fittingType="fill"
                    />
                  </div>
                )}
              </div>
              <Input
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="or paste image URL"
                className="mt-2"
              />
            </div>
            <div>
              <Label>Before Image (optional)</Label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-100 hover:bg-zinc-200 text-sm font-medium transition-colors">
                  <Upload className="w-4 h-4" /> {uploadingBefore ? "Uploading…" : "Upload Before"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onUploadBefore}
                    disabled={uploadingBefore}
                  />
                </label>
                {form.before_image_url && (
                  <div className="w-16 h-12 rounded overflow-hidden bg-zinc-100">
                    <Image
                      src={form.before_image_url}
                      alt="before preview"
                      className="w-full h-full"
                      fittingType="fill"
                    />
                  </div>
                )}
              </div>
              <Input
                value={form.before_image_url}
                onChange={(e) => setForm({ ...form, before_image_url: e.target.value })}
                placeholder="or paste before image URL"
                className="mt-2"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="Short description"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="feat">Featured</Label>
              <Switch
                id="feat"
                checked={form.featured}
                onCheckedChange={(v) => setForm({ ...form, featured: v })}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={save}
              disabled={saving}
              className="bg-[#F39C12] text-black hover:bg-[#ffb84d]"
            >
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UsersList />
    </div>
  );
}