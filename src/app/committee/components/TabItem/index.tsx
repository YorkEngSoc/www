type TabItemT = {
  activeTab: string;
  tabName: string;
  children: React.ReactNode;
};

export default function TabItem({ activeTab, tabName, children }: TabItemT) {
  return <>{activeTab === tabName && children}</>;
}
