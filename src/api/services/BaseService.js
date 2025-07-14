import apiClient from "../config/apiClient";

class BaseService {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.apiClient = apiClient;
  }

  async get(path = "", params = {}) {
    const url = `${this.endpoint}${path}`;
    return this.apiClient.get(url, { params });
  }

  async post(path, data, config = {}) {
    const url = `${this.endpoint}${path}`;
    return this.apiClient.post(url, data, config);
  }

  async put(path, data) {
    const url = `${this.endpoint}${path}`;
    return this.apiClient.put(url, data);
  }

  async delete(path) {
    const url = `${this.endpoint}${path}`;
    return this.apiClient.delete(url);
  }
}

export default BaseService;
