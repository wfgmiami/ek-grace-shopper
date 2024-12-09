const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

const Product = conn.define('product', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  }
});

const CreditCard = conn.define('creditCard', {
  brand: {
    type: conn.Sequelize.ENUM('VISA', 'AMEX', 'DISCOVER')
  },
  number: {
    type: conn.Sequelize.INTEGER,
    defaultValue: 0
  },
  isDefault: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false
  }
});

const Address = conn.define('address', {
  street: {
    type: conn.Sequelize.STRING,
  },
  isDefault: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false
  }
});

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  },
  password: conn.Sequelize.STRING
});

const Order = conn.define('order', {
  state: {
    type: conn.Sequelize.ENUM('CART', 'ORDER'),
    defaultValue: 'CART'
  }
});

const LineItem = conn.define('lineItem', {
  quantity: {
    type: conn.Sequelize.INTEGER,
    defaultValue: 0
  }
});

const Review = conn.define('review', {
  text: {
    type: conn.Sequelize.TEXT
  },
  rating: {
    type: conn.Sequelize.INTEGER,
    defaultValue: 0
  }
});

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
Review.belongsTo(LineItem);
LineItem.hasMany(Review);

Product.hasMany(LineItem);
Order.hasMany(LineItem);
Order.belongsTo(User);
Order.belongsTo(CreditCard);
Order.belongsTo(Address);
User.hasMany(Order);
User.hasMany(CreditCard);
User.hasMany(Address);

const sync = ()=> conn.sync({ force: true });

const seed = ()=> {
  const products = ['foo', 'bar', 'bazz'];
  const users = ['moe', 'larry', 'curly'];
  let foo, bar, bazz, moe, larry, curly;

  return sync()
    .then(()=> {
      const promises = products.map(name => Product.create({ name }))
        .concat(users.map( name => User.create( { name, password: name.toUpperCase()})));
      return Promise.all(promises);
    })
    .then( result => [ foo, bar, bazz, moe, larry, curly ] = result )
    .then(()=>{
      return Promise.all([
        CreditCard.create({
          brand: 'DISCOVER',
          id: 890,
          userId: moe.id
        }),
        CreditCard.create({
          brand: 'VISA',
          id: 123,
          userId: moe.id
        }),
        CreditCard.create({
          brand: 'AMEX',
          id: 456,
          userId: moe.id,
          isDefault: true
        })
      ]);
    })
    .then(()=>{
      return Promise.all([
        Address.create({
          street: 'NYC',
          userId: moe.id
        }),
        Address.create({
          street: 'LONDON',
          userId: moe.id,
          isDefault: true
        }),
        Address.create({
          street: 'PARIS',
          userId: moe.id
        }),
      ]);
    })
    .then(()=> {
      return {
        moe,
        larry,
        curly,
        foo,
        bar,
        bazz
      };
    });
};

module.exports = {
  models: {
    Product,
    User,
    Order,
    LineItem,
    Review,
    CreditCard,
    Address
  },
  sync,
  seed
};
