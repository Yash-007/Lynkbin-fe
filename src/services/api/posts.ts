import apiClient, { ApiResponse } from '@/lib/api';

// Backend uses "topic" for title, we'll map it
export interface Post {
  id: number;
  user_id: number;
  platform: string; // "linkedin" or "x" from backend
  author: string;
  category: string;
  topic: string; // This is the title
  tags: string[];
  description: string;
  created_at: string;
}

export interface CreatePostRequest {
  url: string;
}

export interface CreatePostResponse extends Post {
  post_link: string;
}

export interface GetPostsParams {
  platform?: string;
  tags?: string[];
  authors?: string[];
  categories?: string[];
}

export const postsApi = {
  // Create a new post by URL
  createPost: async (url: string): Promise<CreatePostResponse> => {
    const response = await apiClient.post<ApiResponse<CreatePostResponse>>('/posts', { url });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create post');
    }
    return response.data.data!;
  },

  // Get posts with optional filters
  getPosts: async (params: GetPostsParams = {}): Promise<Post[]> => {
    const queryParams = new URLSearchParams();
    
    if (params.platform) {
      // Map frontend platform names to backend (twitter -> x)
      const backendPlatform = params.platform === 'twitter' ? 'x' : params.platform;
      queryParams.append('platform', backendPlatform);
    }
    
    if (params.tags && params.tags.length > 0) {
      params.tags.forEach(tag => queryParams.append('tags[]', tag));
    }
    
    if (params.authors && params.authors.length > 0) {
      params.authors.forEach(author => queryParams.append('authors[]', author));
    }
    
    if (params.categories && params.categories.length > 0) {
      params.categories.forEach(category => queryParams.append('categories[]', category));
    }

    const response = await apiClient.get<ApiResponse<Post[]>>(`/posts?${queryParams.toString()}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch posts');
    }
    return response.data.data || [];
  },

  // Get user's authors for a platform
  getAuthors: async (platform: string): Promise<string[]> => {
    const backendPlatform = platform === 'twitter' ? 'x' : platform;
    const response = await apiClient.get<ApiResponse<string[]>>(`/posts/authors?platform=${backendPlatform}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch authors');
    }
    return response.data.data || [];
  },

  // Get user's categories for a platform
  getCategories: async (platform: string): Promise<string[]> => {
    const backendPlatform = platform === 'twitter' ? 'x' : platform;
    const response = await apiClient.get<ApiResponse<string[]>>(`/posts/categories?platform=${backendPlatform}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch categories');
    }
    return response.data.data || [];
  },

  // Get user's tags for a platform
  getTags: async (platform: string): Promise<string[]> => {
    const backendPlatform = platform === 'twitter' ? 'x' : platform;
    const response = await apiClient.get<ApiResponse<string[]>>(`/posts/tags?platform=${backendPlatform}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch tags');
    }
    return response.data.data || [];
  },
};

