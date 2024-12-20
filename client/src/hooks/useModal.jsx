import { useState } from "react";

const useModal = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const close = () => setModalOpen(false);
	const open = () => setModalOpen(true);

	return { modalOpen, open, close };
};

export default useModal;
