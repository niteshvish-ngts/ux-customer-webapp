import SettingsPage from '@/components/settings/page';

type Props = { params: Promise<{ section: string }> };

export default async function SettingsSectionRoute({ params }: Props) {
  const { section } = await params;
  return <SettingsPage section={section} />;
}
