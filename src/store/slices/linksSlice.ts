import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postsApi, Post } from '@/services/api/posts';

// Frontend LinkItem that maps from backend Post
export interface LinkItem {
  id: string;
  title: string; // Maps from backend's "topic"
  data: string; // Contains URL for links or full text content for notes
  description: string; // AI-generated summary
  author: string;
  platform: "linkedin" | "twitter" | "reddit" | /* "instagram" | "facebook" | */ "notes" | "others"; // Instagram and Facebook - Not supported yet
  tags: string[];
  category: string;
  savedAt: string; // Maps from backend's "created_at"
}

// Helper function to transform backend Post to frontend LinkItem
const transformPostToLink = (post: Post): LinkItem => ({
  id: post.id.toString(),
  title: post.topic ? post.topic : post.data,
  data: post.data, // Contains URL for links or text content for notes
  description: post.description,
  author: post.author,
  platform: post.platform === 'x' ? 'twitter' : (post.platform as any), // Map x -> twitter, keep notes as notes
  tags: post.tags || [],
  category: post.category,
  savedAt: post.created_at,
});

interface LinksState {
  items: LinkItem[];
  availableAuthors: string[];
  availableTags: string[];
  availableCategories: string[];
  isLoading: boolean;
  error: string | null;
  selectedPlatform: string;
  selectedAuthors: string[];
  selectedTags: string[];
  selectedCategory: string;
  sortOrder: 'desc' | 'asc'; // Sort by date: desc = newest first, asc = oldest first
  // Separate state for Categories page
  categoryPageItems: LinkItem[];
  categoryPageCategories: string[];
  categoryPageLoading: boolean;
  categoryPageError: string | null;
}

const initialState: LinksState = {
  items: [],
  availableAuthors: [],
  availableTags: [],
  availableCategories: [],
  isLoading: false,
  error: null,
  selectedPlatform: localStorage.getItem('selectedPlatform') || 'linkedin',
  selectedAuthors: [],
  selectedTags: [],
  selectedCategory: 'Design',
  sortOrder: 'desc', // Default to newest first
  // Separate state for Categories page
  categoryPageItems: [],
  categoryPageCategories: [],
  categoryPageLoading: false,
  categoryPageError: null,
};

// Async thunks
export const fetchLinks = createAsyncThunk(
  'links/fetchLinks',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const platform = state.links.selectedPlatform;
      const posts = await postsApi.getPosts({ platform });
      return posts.map(transformPostToLink);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch links');
    }
  }
);

export const fetchLinksByPlatform = createAsyncThunk(
  'links/fetchLinksByPlatform',
  async (platform: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const { selectedAuthors, selectedTags } = state.links;
      
      const posts = await postsApi.getPosts({
        platform,
        authors: selectedAuthors.length > 0 ? selectedAuthors : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
      });
      return posts.map(transformPostToLink);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch links');
    }
  }
);

export const addLink = createAsyncThunk(
  'links/addLink',
  async ({ url, notes, is_url, tags }: { url: string; notes: string; is_url: boolean; tags?: string[] }, { rejectWithValue }) => {
    try {
      const post = await postsApi.createPost(url, notes, is_url, tags);
      return transformPostToLink(post);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add link');
    }
  }
);

export const fetchAuthors = createAsyncThunk(
  'links/fetchAuthors',
  async (platform: string, { rejectWithValue }) => {
    try {
      return await postsApi.getAuthors(platform);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch authors');
    }
  }
);

export const fetchTags = createAsyncThunk(
  'links/fetchTags',
  async (platform: string, { rejectWithValue }) => {
    try {
      return await postsApi.getTags(platform);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch tags');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'links/fetchCategories',
  async (platform: string, { rejectWithValue }) => {
    try {
      return await postsApi.getCategories(platform);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

// Separate actions for Categories page (no filters applied)
export const fetchCategoryPageData = createAsyncThunk(
  'links/fetchCategoryPageData',
  async (platform: string, { rejectWithValue }) => {
    try {
      // Fetch posts by platform only, without any filters
      const posts = await postsApi.getPosts({ platform });
      const categories = await postsApi.getCategories(platform);
      
      return {
        posts: posts.map(transformPostToLink),
        categories,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch category page data');
    }
  }
);

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    setSelectedPlatform: (state, action: PayloadAction<string>) => {
      state.selectedPlatform = action.payload;
      localStorage.setItem('selectedPlatform', action.payload);
    },
    setSelectedAuthors: (state, action: PayloadAction<string[]>) => {
      state.selectedAuthors = action.payload;
    },
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'desc' | 'asc'>) => {
      state.sortOrder = action.payload;
    },
    toggleAuthor: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.selectedAuthors.includes(author)) {
        state.selectedAuthors = state.selectedAuthors.filter(a => a !== author);
      } else {
        state.selectedAuthors.push(author);
      }
    },
    toggleTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload;
      if (state.selectedTags.includes(tag)) {
        state.selectedTags = state.selectedTags.filter(t => t !== tag);
      } else {
        state.selectedTags.push(tag);
      }
    },
    clearFilters: (state) => {
      state.selectedAuthors = [];
      state.selectedTags = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch links
    builder.addCase(fetchLinks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchLinks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchLinks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch links by platform
    builder.addCase(fetchLinksByPlatform.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchLinksByPlatform.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchLinksByPlatform.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Add link
    builder.addCase(addLink.pending, (state) => {
      state.error = null;
    });
    builder.addCase(addLink.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items.unshift(action.payload);
    });
    builder.addCase(addLink.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch authors
    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      state.availableAuthors = action.payload;
    });

    // Fetch tags
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.availableTags = action.payload;
    });

    // Fetch categories
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.availableCategories = action.payload;
    });

    // Fetch category page data
    builder.addCase(fetchCategoryPageData.pending, (state) => {
      state.categoryPageLoading = true;
      state.categoryPageError = null;
    });
    builder.addCase(fetchCategoryPageData.fulfilled, (state, action) => {
      state.categoryPageLoading = false;
      state.categoryPageItems = action.payload.posts;
      state.categoryPageCategories = action.payload.categories;
    });
    builder.addCase(fetchCategoryPageData.rejected, (state, action) => {
      state.categoryPageLoading = false;
      state.categoryPageError = action.payload as string;
    });
  },
});

export const {
  setSelectedPlatform,
  setSelectedAuthors,
  setSelectedTags,
  setSelectedCategory,
  setSortOrder,
  toggleAuthor,
  toggleTag,
  clearFilters,
  clearError,
} = linksSlice.actions;

export default linksSlice.reducer;

