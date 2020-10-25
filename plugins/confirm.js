$.confirm = function (options) {
  console.log(options);
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      width: "400px",
      closable: false,
      content: options.content,
      onClose() {
        console.log("onClose");
        modal.destroy();
      },
      footerButtons: [
        {
          text: "Cancel",
          type: "secondary",
          handler() {
            modal.close();
            reject();
          },
        },
        {
          text: "Delete",
          type: "danger",
          handler() {
            modal.close();
            resolve();
          },
        },
      ],
    });

    setTimeout(() => {
      modal.open();
    }, 100);
  });
};
