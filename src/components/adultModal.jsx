import React from "react";

const AdultModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="text-4xl mb-4">🔞</div>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Age Confirmation
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Hmmm saale, naughty horha. 😈
            <br />
            Are you 18+ and want to see adult content?
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-lg hover:from-pink-600 hover:to-red-700 transition-colors font-semibold"
            >
              😈 Confirm 😈
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdultModal;
