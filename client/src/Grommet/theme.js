export const theme = {
  global: {
    font: {
      family: 'Arial',
      size: '16px',
      height: '20px',
    },
    focus: {
      border: {
        color: "#DBD9DB"
      },
    },
    hover: {
      color: "#ED2D23"
    }
  },
  anchor: {
    fontWeight: "normal",
    hover: {
      textDecoration: "none",
      extend: "color: #ED2D23"
    }
  },
  tabs: {
    extend: "width: 100%",
    // extend: "height: 100vh",
  },
  tab: {
    color: "#363135",
    hover: {
      color: "#ED2D23",
    },
    active: {
      color: "#ED2D23",
    },
    border: {
      color: "#363135",
      active: {
        color: "#ED2D23"
      },
      hover: {
        color: "#ED2D23"
      }
    },
  }
};