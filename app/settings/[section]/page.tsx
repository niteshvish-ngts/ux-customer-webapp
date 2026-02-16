import Navbar2 from '@/components/common/navbar2/page';
import SettingsPage from '@/components/settings/page';

type Props = { params: Promise<{ section: string }> };

export default async function SettingsSectionRoute({ params }: Props) {
  const { section } = await params;

  return (
    <><Navbar2 />
      <SettingsPage section={section} />
    </>
  );
}
