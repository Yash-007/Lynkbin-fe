import apiClient, { ApiResponse } from '@/lib/api';

// Backend uses "topic" for title, we'll map it
export interface Post {
  id: number;
  user_id: number;
  link: string;
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
      params.tags.forEach(tag => queryParams.append('tags', tag));
    }
    
    if (params.authors && params.authors.length > 0) {
      params.authors.forEach(author => queryParams.append('authors', author));
    }
    
    if (params.categories && params.categories.length > 0) {
      params.categories.forEach(category => queryParams.append('categories', category));
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
    
    interface UserAuthor {
      user_id: number;
      platform: string;
      names: string[];
      created_at: string;
    }
    
    const response = await apiClient.get<ApiResponse<UserAuthor[]>>(`/posts/authors?platform=${backendPlatform}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch authors');
    }
    
    // Backend returns array of UserAuthor objects, extract and flatten the names arrays
    const authors = response.data.data || [];
    let allAuthors = authors.flatMap(author => author.names || []);
    allAuthors = allAuthors.filter(author => author !== '').map(author => author.trim());
    return [...new Set(allAuthors)]; // Remove duplicates
  },

  // Get user's categories for a platform
  getCategories: async (platform: string): Promise<string[]> => {
    const backendPlatform = platform === 'twitter' ? 'x' : platform;
    
    interface UserCategories {
      user_id: number;
      platform: string;
      categories: string[];
      updated_at: string;
    }
    
    const response = await apiClient.get<ApiResponse<UserCategories[]>>(`/posts/categories?platform=${backendPlatform}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch categories');
    }
    
    // Backend returns array of UserCategories objects, extract and flatten the categories arrays
    const categoryObjs = response.data.data || [];
    let allCategories = categoryObjs.flatMap(cat => cat.categories || []);
    allCategories = allCategories.filter(category => category !== '').map(category => category.trim());
    return [...new Set(allCategories)]; // Remove duplicates
  },

  // Get user's tags for a platform
  getTags: async (platform: string): Promise<string[]> => {
    const backendPlatform = platform === 'twitter' ? 'x' : platform;
    
    interface UserTags {
      user_id: number;
      platform: string;
      tags: string[];
      created_at: string;
      updated_at: string;
    }
    
    const response = await apiClient.get<ApiResponse<UserTags[]>>(`/posts/tags?platform=${backendPlatform}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch tags');
    }
    
    // Backend returns array of UserTags objects, extract and flatten the tags arrays
    const tagObjs = response.data.data || [];
    let allTags = tagObjs.flatMap(tagObj => tagObj.tags || []);
    allTags = allTags.filter(tag => tag !== '').map(tag => tag.trim());
    return [...new Set(allTags)]; // Remove duplicates
  },

  // Get total posts, tags and categories count
  getTagsAndCategoriesCount: async (): Promise<{ total_posts_count: number; total_tags_count: number; total_categories_count: number }> => {
    const response = await apiClient.get<ApiResponse<{ total_posts_count: number; total_tags_count: number; total_categories_count: number }>>('/posts/counts');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch stats');
    }
    return response.data.data;
  },
};

