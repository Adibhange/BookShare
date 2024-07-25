import React, { Children, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ModalContainer from "./ModalContainer.jsx";
import Backdrop from "./Backdrop";
import useModal from "./../../hooks/useModal";
import SignUp from "./../Header/SignUp";
import SignIn from "./../Header/SignIn";
import { IoCloseSharp } from "react-icons/io5";

const AuthModal = () => {
	const { modalOpen, open, close } = useModal("");
	const [isSignIn, setIsSignUp] = useState(true);
	const [initialLoad, setInitialLoad] = useState(true);

	const toggleForm = () => {
		setIsSignUp(!isSignIn);
		setInitialLoad(false);
	};

	useEffect(() => {
		if (!modalOpen) {
			setIsSignUp(true);
			setInitialLoad(true);
		}
	}, [modalOpen]);

	const authVariants = {
		hidden: {
			y: "-10vh",
			opacity: 0,
		},
		visible: {
			y: "0",
			opacity: 1,
			transition: {
				duration: 0.2,
				type: "spring",
				damping: 25,
				stiffness: 1000,
			},
		},
		exit: {
			y: "-10vh",
			opacity: 0,
		},
	};

	const formVariants = {
		hidden: { opacity: 0, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.1,
				type: "spring",
				damping: 15,
				stiffness: 150,
			},
		},
		exit: { opacity: 0, scale: 0 },
	};

	const ModalButton = ({ onClick }) => (
		<motion.button
			className='absolute right-0 mr-2 mt-1 h-auto '
			type='button'
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
			onClick={onClick}>
			<IoCloseSharp className='text-3xl  text-text opacity-60 hover:opacity-100' />
		</motion.button>
	);

	return (
		<>
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={open}
				className='px-2 md:px-3 lg:px-5 py-2 mx-0 lg:mx-2 text-text font-bold rounded-xl border-border border-2'>
				Sign In
			</motion.button>
			<ModalContainer>
				{modalOpen && (
					<Backdrop onClick={close}>
						<motion.section
							onClick={(e) => e.stopPropagation()}
							className=' w-[95%] lg:w-1/2 md:w-3/4 h-auto mx-auto py-0 px-8 rounded-xl z-50 flex flex-col items-center bg-foreground'
							variants={authVariants}
							initial='hidden'
							animate='visible'
							exit='exit'>
							<ModalButton onClick={close} />

							<motion.div
								key={isSignIn ? "SignIn" : "SignUp"}
								className='flex flex-col items-center h-full w-full p-8'
								variants={initialLoad ? {} : formVariants}
								initial='hidden'
								animate='visible'
								exit='exit'>
								{isSignIn ? (
									<SignIn
										toggleForm={toggleForm}
										closeModal={close}
									/>
								) : (
									<SignUp toggleForm={toggleForm} />
								)}
							</motion.div>
						</motion.section>
					</Backdrop>
				)}
			</ModalContainer>
		</>
	);
};

export default AuthModal;
