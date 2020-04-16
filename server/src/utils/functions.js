const bd = require('../models');
const CONSTANTS = require('../constants');

module.exports.createWhereForAllContests = (
  type, contestId, industry, awardSort) => {
  let object = {
    where: {},
    order: [],
  };

  if (type) {
    Object.assign(object.where, { contestType: {[ bd.Sequelize.Op.or ]:type.split(',')}});
  }
  if (contestId) {
    Object.assign(object.where, { id: contestId });
  }
  if (industry) {
    Object.assign(object.where, { industry: {[ bd.Sequelize.Op.or ]:industry.split(',')} });
  }
  if (awardSort) {
    object.order.push(['prize', awardSort]);
  }
  Object.assign(object.where, {
    status: {
      [ bd.Sequelize.Op.or ]: [
        CONSTANTS.CONTEST_STATUS_FINISHED,
        CONSTANTS.CONTEST_STATUS_ACTIVE,
      ],
    },
  });
  object.order.push(['id', 'desc']);

  return object;
};

function getPredicateTypes (index) {
  return { [ bd.Sequelize.Op.or ]: [types[ index ].split(',')] };
}

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo'
];