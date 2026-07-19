type NavbarProps = {
  title: string;
};

export default function Navbar({ title }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white shadow">
            {"</>"}
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>

            <p className="text-sm text-slate-500">
              Developer Workspace
            </p>
          </div>

        </div>

        {/* Status */}
        <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 md:flex">
          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>

          <span className="text-sm font-medium text-emerald-700">
            Ready to Build
          </span>
        </div>

      </div>
    </nav>
  );
}