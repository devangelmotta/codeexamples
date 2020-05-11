import { useState, useCallback } from 'react';

import { MainLayout } from '~/components/layout';
import { ListMembersSection, Title, AddMemberModal } from '~/components/pages/team';

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModalHandler = useCallback(() => {
    setIsModalVisible(currentValue => !currentValue);
  }, []);

  return (
    <MainLayout pathname="team">
      <div className="py-8">
        <Title />
        {/* <EmptyTeamSection toggleModalHandler={toggleModalHandler} /> */}
        <ListMembersSection toggleModalHandler={toggleModalHandler} />
        <AddMemberModal
          visible={isModalVisible}
          toggleModalHandler={toggleModalHandler}
        />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
