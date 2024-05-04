import { useState } from 'react'

import { Tab, TabSwitcher } from '@/components/ui/tabs-switcher/TabSwitcher'

export const TabSwitcherDemo = () => {
  const tabs: Tab[] = [
    { text: 'Switcher1', value: 'Switcher1' },
    { disabled: true, text: 'Switcher2', value: 'Switcher2' },
    { text: 'Switcher3', value: 'Switcher3' },
  ]
  const [tabsRootValue, setTabsRootValue] = useState('some value')

  return (
    <div>
      <TabSwitcher onValueChange={setTabsRootValue} tabs={tabs} value={tabsRootValue} />
    </div>
  )
}
