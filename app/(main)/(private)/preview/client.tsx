"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Eye, Edit, Save, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ResumeData } from "@/lib/actions";
import { getUrl } from "@/lib/utils";
import { useUserActions } from "@/hooks/use-user-actions";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loading } from "@/components/ui/loading";
import { PreviewBar } from "@/components/preview/preview-bar";
import { PopupLive } from "@/components/preview/popup-live";
import { FinalResume } from "@/components/resume/final-resume";
import { EditResume } from "@/components/resume/editing/edit-resume";

export default function PreviewClient({ messageTip }: { messageTip?: string }) {
  const { user } = useUser();
  const {
    resumeQuery,
    toggleStatusMutation,
    usernameQuery,
    saveResumeDataMutation,
  } = useUserActions();
  const [showModalSiteLive, setModalSiteLive] = useState(false);
  const [localResumeData, setLocalResumeData] = useState<ResumeData>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);

  useEffect(() => {
    if (resumeQuery.data?.resume?.resumeData) {
      setLocalResumeData(resumeQuery.data?.resume?.resumeData);
    }
  }, [resumeQuery.data?.resume?.resumeData]);

  console.log("resumeQuery", resumeQuery.data);

  const handleSaveChanges = async () => {
    if (!localResumeData) {
      toast.error("No resume data to save");
      return;
    }

    try {
      await saveResumeDataMutation.mutateAsync(localResumeData);
      toast.success("Changes saved successfully");
      setHasUnsavedChanges(false);
      setIsEditMode(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to save changes: ${error.message}`);
      } else {
        toast.error("Failed to save changes");
      }
    }
  };

  const handleDiscardChanges = () => {
    setShowDiscardConfirmation(true);
  };

  const confirmDiscardChanges = () => {
    if (resumeQuery.data?.resume?.resumeData) {
      setLocalResumeData(resumeQuery.data?.resume?.resumeData);
    }
    setHasUnsavedChanges(false);
    setIsEditMode(false);
    setShowDiscardConfirmation(false);
    toast.info("Changes discarded");
  };

  const handleResumeChange = (newResume: ResumeData) => {
    setLocalResumeData(newResume);
    setHasUnsavedChanges(true);
  };

  if (
    resumeQuery.isLoading ||
    usernameQuery.isLoading ||
    !usernameQuery.data ||
    !localResumeData
  ) {
    return <Loading message='Loading' />;
  }

  const CustomLiveToast = () => (
    <div className='rounded-base relative flex h-11 w-fit min-w-[22.5rem] flex-row items-center justify-between gap-2 border border-green-500 bg-[#eaffea] px-2 shadow'>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'
        className='size-6'
      >
        <rect width='24' height='24' rx='4' fill='#EAFFEA'></rect>
        <path
          d='M16.6668 8.5L10.2502 14.9167L7.3335 12'
          stroke='#009505'
          strokeWidth='1.3'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>
      </svg>
      <p className='mr-2 text-left text-sm text-[#003c02]'>
        <span className='hidden md:block'> Your website has been updated!</span>
        <span className='md:hidden'> Website updated!</span>
      </p>
      <a
        href={getUrl(usernameQuery.data.username)}
        target='_blank'
        className='rounded-base flex h-6.5 items-center justify-center gap-1 overflow-hidden bg-green-500 px-3 py-1'
      >
        <svg
          width='10'
          height='10'
          viewBox='0 0 10 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          preserveAspectRatio='xMidYMid meet'
          className='relative size-2.5 shrink-0 grow-0'
        >
          <path
            d='M6.86768 2.39591L1.50684 7.75675L2.2434 8.49331L7.60425 3.13248V7.60425H8.64591V1.35425H2.39591V2.39591H6.86768Z'
            fill='white'
          ></path>
        </svg>
        <p className='font-base shrink-0 grow-0 text-left text-sm'>View</p>
      </a>
    </div>
  );

  return (
    <section className='grid min-h-[80dvh] w-full place-items-center'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mx-auto w-full max-w-4xl flex-col gap-y-8 pb-16'
      >
        <div className='mx-auto w-full max-w-4xl flex-col gap-y-8 pb-16'>
          {messageTip && (
            <motion.div
              className='px-4 md:px-2'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className='rounded-base flex items-start border border-yellow-200 bg-yellow-50 p-4 text-yellow-800'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='mt-0.5 mr-2 size-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
                <p>{messageTip}</p>
              </div>
            </motion.div>
          )}
          <div className='mt-4 px-4 lg:px-0'>
            <PreviewBar
              initialUsername={usernameQuery.data.username}
              status={resumeQuery.data?.resume?.status}
              onStatusChange={async (newStatus) => {
                await toggleStatusMutation.mutateAsync(newStatus);
                const isFirstTime = !localStorage.getItem("publishedSite");
                if (isFirstTime && newStatus === "live") {
                  setModalSiteLive(true);
                  localStorage.setItem(
                    "publishedSite",
                    new Date().toDateString()
                  );
                } else {
                  if (newStatus === "draft") {
                    toast.warning("Your website has been unpublished");
                  } else {
                    toast.custom(() => <CustomLiveToast />);
                  }
                }
              }}
              isChangingStatus={toggleStatusMutation.isPending}
            />
          </div>
          <div className='xs:flex-row xs:pl-3 mx-auto mt-6 mb-4 flex flex-col items-center justify-between gap-4 px-4'>
            <ToggleGroup
              type='single'
              value={isEditMode ? "edit" : "preview"}
              onValueChange={(value) => setIsEditMode(value === "edit")}
              aria-label='View mode'
            >
              <ToggleGroupItem value='preview' aria-label='Preview mode'>
                <Eye className='mr-1 size-4' />
                <span>View</span>
              </ToggleGroupItem>
              <ToggleGroupItem value='edit' aria-label='Edit mode'>
                <Edit className='mr-1 size-4' />
                <span>Edit</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <AnimatePresence mode='wait' initial={false}>
              {isEditMode && (
                <motion.div
                  key='edit-buttons'
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className='flex gap-2'
                >
                  <Button
                    size='sm'
                    variant='neutral'
                    onClick={handleDiscardChanges}
                    className='flex items-center gap-0.5 px-2'
                    disabled={
                      !hasUnsavedChanges || saveResumeDataMutation.isPending
                    }
                  >
                    <X className='size-3.5' />
                    <span>Discard</span>
                  </Button>
                  <Button
                    size='sm'
                    onClick={handleSaveChanges}
                    className='flex items-center gap-1.5 px-2'
                    disabled={
                      !hasUnsavedChanges || saveResumeDataMutation.isPending
                    }
                  >
                    {saveResumeDataMutation.isPending ? (
                      <span className='animate-spin'>⌛</span>
                    ) : (
                      <Save className='size-3.5' />
                    )}
                    <span>
                      {saveResumeDataMutation.isPending ? "Saving..." : "Save"}
                    </span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className='md:rounded-base mx-auto flex items-center justify-between px-4 md:border-[0.5px] md:px-2'>
            <AnimatePresence mode='wait' initial={false}>
              {isEditMode ? (
                <motion.div
                  key='edit'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className='w-full'
                >
                  <EditResume
                    resume={localResumeData}
                    onChangeResume={handleResumeChange}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key='preview'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className='w-full'
                >
                  <FinalResume
                    resume={localResumeData}
                    profilePicture={user?.imageUrl}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AlertDialog
            open={showDiscardConfirmation}
            onOpenChange={setShowDiscardConfirmation}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Discard Changes?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to discard your changes? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDiscardChanges}>
                  Discard
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <PopupLive
            isOpen={showModalSiteLive}
            websiteUrl={getUrl(usernameQuery.data.username)}
            onClose={() => {
              setModalSiteLive(false);
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { toast } from "sonner";
// import { Eye, Edit, Save, X } from "lucide-react";
// import { ResumeData } from "@/lib/actions";
// import { getUrl } from "@/lib/utils";
// import { useUserActions } from "@/hooks/use-user-actions";
// import { Button } from "@/components/ui/button";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Loading } from "@/components/ui/loading";
// import { PreviewBar } from "@/components/preview/preview-bar";
// import { PopupLive } from "@/components/preview/popup-live";
// import { FinalResume } from "@/components/resume/final-resume";
// import { EditResume } from "@/components/resume/editing/edit-resume";

// export default function PreviewClient({ messageTip }: { messageTip?: string }) {
//   const { user } = useUser();
//   const {
//     resumeQuery,
//     toggleStatusMutation,
//     usernameQuery,
//     saveResumeDataMutation,
//   } = useUserActions();
//   const [showModalSiteLive, setModalSiteLive] = useState(false);
//   const [localResumeData, setLocalResumeData] = useState<ResumeData>();
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
//   const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);

//   useEffect(() => {
//     if (resumeQuery.data?.resume?.resumeData) {
//       setLocalResumeData(resumeQuery.data?.resume?.resumeData);
//     }
//   }, [resumeQuery.data?.resume?.resumeData]);

//   console.log("resumeQuery", resumeQuery.data);

//   const handleSaveChanges = async () => {
//     if (!localResumeData) {
//       toast.error("No resume data to save");
//       return;
//     }

//     try {
//       await saveResumeDataMutation.mutateAsync(localResumeData);
//       toast.success("Changes saved successfully");
//       setHasUnsavedChanges(false);
//       setIsEditMode(false);
//     } catch (error) {
//       if (error instanceof Error) {
//         toast.error(`Failed to save changes: ${error.message}`);
//       } else {
//         toast.error("Failed to save changes");
//       }
//     }
//   };

//   const handleDiscardChanges = () => {
//     setShowDiscardConfirmation(true);
//   };

//   const confirmDiscardChanges = () => {
//     if (resumeQuery.data?.resume?.resumeData) {
//       setLocalResumeData(resumeQuery.data?.resume?.resumeData);
//     }
//     setHasUnsavedChanges(false);
//     setIsEditMode(false);
//     setShowDiscardConfirmation(false);
//     toast.info("Changes discarded");
//   };

//   const handleResumeChange = (newResume: ResumeData) => {
//     setLocalResumeData(newResume);
//     setHasUnsavedChanges(true);
//   };

//   if (
//     resumeQuery.isLoading ||
//     usernameQuery.isLoading ||
//     !usernameQuery.data ||
//     !localResumeData
//   ) {
//     return <Loading message='Loading' />;
//   }

//   const CustomLiveToast = () => (
//     <div className='rounded-base relative flex h-11 w-fit min-w-[22.5rem] flex-row items-center justify-between gap-2 border border-green-500 bg-[#eaffea] px-2 shadow'>
//       <svg
//         width='24'
//         height='24'
//         viewBox='0 0 24 24'
//         fill='none'
//         xmlns='http://www.w3.org/2000/svg'
//         preserveAspectRatio='none'
//         className='size-6'
//       >
//         <rect width='24' height='24' rx='4' fill='#EAFFEA'></rect>
//         <path
//           d='M16.6668 8.5L10.2502 14.9167L7.3335 12'
//           stroke='#009505'
//           strokeWidth='1.3'
//           strokeLinecap='round'
//           strokeLinejoin='round'
//         ></path>
//       </svg>
//       <p className='mr-2 text-left text-sm text-[#003c02]'>
//         <span className='hidden md:block'> Your website has been updated!</span>
//         <span className='md:hidden'> Website updated!</span>
//       </p>
//       <a
//         href={getUrl(usernameQuery.data.username)}
//         target='_blank'
//         className='rounded-base flex h-6.5 items-center justify-center gap-1 overflow-hidden bg-green-500 px-3 py-1'
//       >
//         <svg
//           width='10'
//           height='10'
//           viewBox='0 0 10 10'
//           fill='none'
//           xmlns='http://www.w3.org/2000/svg'
//           preserveAspectRatio='xMidYMid meet'
//           className='relative size-2.5 shrink-0 grow-0'
//         >
//           <path
//             d='M6.86768 2.39591L1.50684 7.75675L2.2434 8.49331L7.60425 3.13248V7.60425H8.64591V1.35425H2.39591V2.39591H6.86768Z'
//             fill='white'
//           ></path>
//         </svg>
//         <p className='font-base shrink-0 grow-0 text-left text-sm text-white'>
//           View
//         </p>
//       </a>
//     </div>
//   );

//   return (
//     <section className='grid min-h-[80dvh] w-full place-items-center'>
//       <div className='mx-auto w-full max-w-4xl flex-col gap-y-8 pb-16'>
//         {messageTip && (
//           <div className='px-4 md:px-2'>
//             <div className='rounded-base flex items-start border border-yellow-200 bg-yellow-50 p-4 text-yellow-800'>
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 className='mt-0.5 mr-2 size-5'
//                 viewBox='0 0 20 20'
//                 fill='currentColor'
//               >
//                 <path
//                   fillRule='evenodd'
//                   d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
//                   clipRule='evenodd'
//                 />
//               </svg>
//               <p>{messageTip}</p>
//             </div>
//           </div>
//         )}
//         <div className='mt-4 px-4 lg:px-0'>
//           <PreviewBar
//             initialUsername={usernameQuery.data.username}
//             status={resumeQuery.data?.resume?.status}
//             onStatusChange={async (newStatus) => {
//               await toggleStatusMutation.mutateAsync(newStatus);
//               const isFirstTime = !localStorage.getItem("publishedSite");

//               if (isFirstTime && newStatus === "live") {
//                 setModalSiteLive(true);
//                 localStorage.setItem(
//                   "publishedSite",
//                   new Date().toDateString()
//                 );
//               } else {
//                 if (newStatus === "draft") {
//                   toast.warning("Your website has been unpublished");
//                 } else {
//                   toast.custom(() => <CustomLiveToast />);
//                 }
//               }
//             }}
//             isChangingStatus={toggleStatusMutation.isPending}
//           />
//         </div>

//         <div className='xs:flex-row xs:pl-3 mx-auto mt-6 mb-4 flex flex-col items-center justify-between gap-4 px-4'>
//           <ToggleGroup
//             type='single'
//             value={isEditMode ? "edit" : "preview"}
//             onValueChange={(value) => setIsEditMode(value === "edit")}
//             aria-label='View mode'
//           >
//             <ToggleGroupItem value='preview' aria-label='Preview mode'>
//               <Eye className='mr-1 size-4' />
//               <span>View</span>
//             </ToggleGroupItem>
//             <ToggleGroupItem value='edit' aria-label='Edit mode'>
//               <Edit className='mr-1 size-4' />
//               <span>Edit</span>
//             </ToggleGroupItem>
//           </ToggleGroup>

//           {isEditMode && (
//             <div className='flex gap-2'>
//               <Button
//                 size='sm'
//                 variant='neutral'
//                 onClick={handleDiscardChanges}
//                 className='flex items-center gap-0.5 px-2'
//                 disabled={
//                   !hasUnsavedChanges || saveResumeDataMutation.isPending
//                 }
//               >
//                 <X className='size-3.5' />
//                 <span>Discard</span>
//               </Button>
//               <Button
//                 size='sm'
//                 onClick={handleSaveChanges}
//                 className='flex items-center gap-1.5 px-2'
//                 disabled={
//                   !hasUnsavedChanges || saveResumeDataMutation.isPending
//                 }
//               >
//                 {saveResumeDataMutation.isPending ? (
//                   <span className='animate-spin'>⌛</span>
//                 ) : (
//                   <Save className='size-3.5' />
//                 )}
//                 <span>
//                   {saveResumeDataMutation.isPending ? "Saving..." : "Save"}
//                 </span>
//               </Button>
//             </div>
//           )}
//         </div>

//         <div className='md:rounded-base mx-auto flex items-center justify-between px-4 md:border-[0.5px] md:px-2'>
//           {isEditMode ? (
//             <EditResume
//               resume={localResumeData}
//               onChangeResume={handleResumeChange}
//             />
//           ) : (
//             <FinalResume
//               resume={localResumeData}
//               profilePicture={user?.imageUrl}
//             />
//           )}
//         </div>

//         <AlertDialog
//           open={showDiscardConfirmation}
//           onOpenChange={setShowDiscardConfirmation}
//         >
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Discard Changes?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 Are you sure you want to discard your changes? This action
//                 cannot be undone.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction onClick={confirmDiscardChanges}>
//                 Discard
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>

//         <PopupLive
//           isOpen={showModalSiteLive}
//           websiteUrl={getUrl(usernameQuery.data.username)}
//           onClose={() => {
//             setModalSiteLive(false);
//           }}
//         />
//       </div>
//     </section>
//   );
// }
