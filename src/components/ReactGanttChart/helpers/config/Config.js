const defvalues = {
  header: {
    top: {
      style: {
        backgroundColor: '#333333',
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
      },
    },
    middle: {
      style: {
        backgroundColor: 'none',
      },
      selectedStyle: {
        backgroundColor: 'none',
        fontWeight: 'bold',
      },
    },
    bottom: {
      style: {
        background: 'none',
        color: 'white',
        fontSize: 9,
      },
      selectedStyle: {
        backgroundColor: 'none',
        fontWeight: 'bold',
      },
    },
  },
  taskList: {
    title: {
      label: 'Projects',
      style: {
        // backgroundColor: '#333333',
        borderBottom: 'solid 1px silver',
        color: 'white',
        textAlign: 'center',
      },
    },
    task: {
      style: {
        backgroundColor: 'none',
      },
    },
    verticalSeparator: {
      style: {
        backgroundColor: '#333333',
      },
      grip: {
        style: {
          backgroundColor: '#cfcfcd',
        },
      },
    },
  },
  dataViewPort: {
    rows: {
      style: {
        backgroundColor: 'none',
        borderBottom: 'none',
      },
    },
    task: {
      showLabel: false,

      style: {
        position: 'absolute',
        borderRadius: 14,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'grey',
      },
      selectedStyle: {
        position: 'absolute',
        borderRadius: 14,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'grey',
      },
    },
  },
  links: {
    color: 'black',
    selectedColor: '#ff00fa',
  },
};

class Config {
  constructor() {
    this.data = defvalues;
  }

  load = values => {
    this.data = {};
    if (values) this.populate(values, defvalues, this.data);
    else this.data = defvalues;
  };

  populate(values, defvalues, final) {
    if (!this.isObject(defvalues)) return;
    for (let key in defvalues) {
      if (!values[key]) {
        //if not exits
        final[key] = defvalues[key];
      } else {
        //if it does
        final[key] = values[key];
        this.populate(values[key], defvalues[key], final[key]);
      }
    }
  }
  isObject(value) {
    if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number')
      return false;
    return true;
  }

  get values() {
    return this.data;
  }
}

const config = new Config();
export default config;
