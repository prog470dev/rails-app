const get = (path) => {
  return fetch(path, {
    method: "GET",
  }).then((response) => response.json());
};

const post = (path, body) => {
  return fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

const put = (path, body) => {
  return fetch(path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

// delete は予約語
const delete_fetch = (path, body) => {
  return fetch(path, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

// sentence

export const fetchSentence = (id) => {
  return get(`/api/sentences/${id}`);
};

export const fetchSentences = (tags) => {
  return get(`/api/sentences?tags=${tags.join("+")}`);
};

export const createSentence = async (data) => {
  return post(`/api/sentences`, data);
};

export const updateSentence = async (id, data) => {
  return put(`/api/sentences/${id}`, data);
};

// tag

export const fetchTag = (id) => {
  return get(`/api/tags/${id}`);
};

export const fetchTags = () => {
  return get(`/api/tags`);
};

export const createTag = async (data) => {
  return post(`/api/tags`, data);
};

export const updateTag = async (id, data) => {
  return put(`/api/tags/${id}`, data);
};

export const deleteUnusedTags = async () => {
  return delete_fetch(`/api/tags/delete_unused`, {});
};

// report

export const fetchTagSummary = () => {
  return get(`/api/tag_summary`);
};
