var keyword
  , current_page
  , limit = 5
  , amount
;

function get_keyword() {
  return keyword;
}

function set_keyword(val) {
  keyword = val;
}

function get_current_page() {
  return current_page;
}

function set_current_page(val) {
  current_page = val;
}

function get_limit() {
  return limit;
}

function set_limit(val) {
  limit = val;
}

function get_amount() {
  return amount;
}

function set_amount(val) {
  amount = val;
}

module.exports = {
  get_keyword: get_keyword,
  set_keyword: set_keyword,
  get_limit: get_limit,
  set_limit: set_limit,
  get_keyword: get_keyword,
  set_amount: set_amount,
}
