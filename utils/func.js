function getFakeSpeedtest() {
  return {
    ping: Math.floor(Math.random() * 50) + 10,
    download: (Math.random() * 80 + 10).toFixed(2),
    upload: (Math.random() * 40 + 5).toFixed(2),
    server: {
      name: "Uztelecom",
      location: "Tashkent",
    },
    ip: `213.230.${Math.floor(Math.random() * 255)}.${Math.floor(
      Math.random() * 255
    )}`,
  };
}

module.exports = { getFakeSpeedtest };
