import React from "react";
import { connect } from "react-redux";
import {
  airdropConstants,
  destroyAirdropForm,
} from "../../../../redux/actions/airdropAction";
import WizardForm from "./WizardForm";

const AirdropModalForm = ({
  closeModal,
  modalForm,
  initialValues,
  destroyAirdropForm,
}) => {
  return (
    <>
      {modalForm && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 sm:max-w-sm md:max-w-md">
              <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex justify-between p-2">
                  <h3 className="mt-2 pl-6 text-xl font-medium text-gray-900 dark:text-white">
                    {initialValues?.id ? "Edit airdrop" : "Add new airdop"}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={() => {
                      destroyAirdropForm();
                      closeModal();
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <WizardForm initialValues={initialValues} />
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  modalForm: state.airdrop.showFormModal,
  initialValues: state.airdrop.initialValuesForm,
});
const mapDispatchtoProps = (dispatch) => ({
  closeModal: () => dispatch({ type: airdropConstants.CLOSE_MODAL }),
  destroyAirdropForm: () => dispatch(destroyAirdropForm()),
});

export default connect(mapStateToProps, mapDispatchtoProps)(AirdropModalForm);
