import { useState } from 'react';

const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onCloseModalHandler = () => {
    setIsModalVisible(false);
  };

  const onOpenModalHandler = () => {
    setIsModalVisible(true);
  };

  return { isModalVisible, setIsModalVisible, onCloseModalHandler, onOpenModalHandler };
};

export default useModal;
