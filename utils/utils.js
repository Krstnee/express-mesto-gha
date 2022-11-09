const bcrypt = require('bcryptjs');
const UnauthorizedError = require('./errors/UnauthorizedError');

const patchRequestOptions = {
  new: true,
  runValidators: true,
  upsert: false,
};

const urlValidatorConfig = {
  protocols: ['http', 'https'],
  require_tld: true,
  require_protocol: true,
  require_host: true,
  require_port: false,
  require_valid_protocol: true,
  allow_underscores: true,
  host_whitelist: false,
  host_blacklist: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
  allow_fragments: true,
  allow_query_components: true,
  disallow_auth: false,
  validate_length: false,
};

function findUserBeCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) { throw new UnauthorizedError('Неправильная почта или пароль'); }
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) { throw new UnauthorizedError('Неправильная почта или пароль'); }
          return user;
        });
    });
}

module.exports = { patchRequestOptions, findUserBeCredentials, urlValidatorConfig };
