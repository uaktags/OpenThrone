import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import buyUpgrade from '@/utils/buyStructureUpgrade';
import { useUser } from '@/context/users';
import FortificationsTab from '@/components/fortification-upgrades';
import HousingTab from '@/components/housing-upgrades';
import EconomyTab from '@/components/economy-upgrades';
import OffenseUpgrade from '@/components/offenseupgrade';
import Alert from '@/components/alert';
import ArmoryUpgradesTab from '@/components/armory-upgrades';
import ClandestineUpgrade from '@/components/clandestineupgrades';
import { Tabs } from '@mantine/core';
import router from 'next/router';
import MainArea from '@/components/MainArea';

const UpgradeTab = (props) => {
  const tab = usePathname()?.split('/')[3];
  const { user, forceUpdate } = useUser();
  const currentPage = tab || 'fortifications';
  const colorScheme = user?.colorScheme;

  useEffect(() => {
    if (currentPage === 'fortifications') {
    }
  }, [currentPage]);

  return (
    <MainArea title="Structure Upgrades">
      <Tabs variant="pills" defaultValue={currentPage} className="mb-2 font-medieval">
        <Tabs.List grow justify="center">
          <Tabs.Tab value="fortifications" onClick={() => {
            router.push("/structures/upgrades/fortifications");
          }}
            color={(colorScheme === "ELF") ? 'green' : (colorScheme === 'GOBLIN' ? 'red' : (colorScheme === 'UNDEAD' ? 'dark' : 'blue'))}
          >
            <span className="text-xl">Fortifications</span>
          </Tabs.Tab>
          <Tabs.Tab value="offense" onClick={() => { router.push("/structures/upgrades/offense") }}
            color={(colorScheme === "ELF") ?
              'green' : (
                colorScheme === 'GOBLIN' ? 'red' : (
                  colorScheme === 'UNDEAD' ? 'dark'
                    : 'blue'
                ))}
          >
            <span className="text-xl">Siege Upgrades</span>
          </Tabs.Tab>
          <Tabs.Tab value="intel" onClick={() => { router.push("/structures/upgrades/intel") }}
            color={(colorScheme === "ELF") ? 'green' : (colorScheme === 'GOBLIN' ? 'red' : (colorScheme === 'UNDEAD' ? 'dark' : 'blue'))}
          >
            <span className="text-xl">Clandestine Upgrades</span>
          </Tabs.Tab>
          <Tabs.Tab value="armory" onClick={() => { router.push("/structures/upgrades/armory") }}
            color={(colorScheme === "ELF") ? 'green' : (colorScheme === 'GOBLIN' ? 'red' : (colorScheme === 'UNDEAD' ? 'dark' : 'blue'))}
          >
            <span className="text-xl">Armory Upgrades</span>
          </Tabs.Tab>
          <Tabs.Tab value="economy" onClick={() => { router.push("/structures/upgrades/economy") }}
            color={(colorScheme === "ELF") ? 'green' : (colorScheme === 'GOBLIN' ? 'red' : (colorScheme === 'UNDEAD' ? 'dark' : 'blue'))}
          >
            <span className="text-xl">Economy Upgrades</span>
          </Tabs.Tab>
          <Tabs.Tab value="houses" onClick={() => { router.push("/structures/upgrades/houses") }}
            color={(colorScheme === "ELF") ? 'green' : (colorScheme === 'GOBLIN' ? 'red' : (colorScheme === 'UNDEAD' ? 'dark' : 'blue'))}
          >
            <span className="text-xl">Housing Upgrades</span>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      
      
      <div className="mb-4 flex justify-center">
        <h2 className='page-title bg-orange-gradient text-gradient-orange text-shadow text-shadow-color-bg-gray-500 text-shadow-xs'>
        {currentPage === 'fortifications' && ('Fortifications')}
        {currentPage === 'offense' && ('Siege Upgrades')}
        {currentPage === 'intel' && ('Clandestine Upgrades')}
        {currentPage === 'armory' && ('Armory Upgrades')}
        {currentPage === 'houses' && ('Housing Upgrades')}
        {currentPage === 'economy' && ('Economy Upgrades')}
        </h2>
      </div>
      <div className="mb-4 flex justify-center my-10 rounded-lg bg-gray-800">
        {currentPage === 'fortifications' && <FortificationsTab userLevel={user?.level} fortLevel={user?.fortLevel} forceUpdate={forceUpdate} />}
        {currentPage === 'offense' && <OffenseUpgrade userLevel={user?.offensiveLevel} fortLevel={user?.fortLevel} forceUpdate={forceUpdate} />}
        {currentPage === 'houses' && <HousingTab userLevel={user?.houseLevel} fortLevel={user?.fortLevel} forceUpdate={forceUpdate} />}
        {currentPage === 'armory' && <ArmoryUpgradesTab userLevel={user?.armoryLevel} fortLevel={user?.fortLevel} forceUpdate={forceUpdate}/> }
        {currentPage === 'economy' && <EconomyTab userLevel={user?.economyLevel} fortLevel={user?.fortLevel} forceUpdate={forceUpdate}/>}
        {currentPage === 'intel' && <ClandestineUpgrade userLevel={user?.spyLevel} fortLevel={user?.fortLevel} forceUpdate={forceUpdate}/>}
      </div>
    </MainArea>
  );
};
export default UpgradeTab;
