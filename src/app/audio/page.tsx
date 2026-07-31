import { AudioSettingsPanel } from "@/components/audio/AudioSettingsPanel";
import { AppShell } from "@/components/shell/AppShell";

export default function AudioPage() {
  return <AppShell><div className="mx-auto max-w-5xl py-14"><h1 className="mb-8 text-5xl font-black">Audio settings</h1><AudioSettingsPanel /></div></AppShell>;
}
