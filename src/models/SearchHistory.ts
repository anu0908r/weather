import mongoose, { Schema, Model, Document } from 'mongoose';

export interface ISearchHistory extends Document {
  userId: mongoose.Types.ObjectId;
  city: string;
  country?: string;
  searchedAt: Date;
}

const SearchHistorySchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    searchedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  }
);

// Index for efficient querying by user and date
SearchHistorySchema.index({ userId: 1, searchedAt: -1 });

const SearchHistory: Model<ISearchHistory> =
  mongoose.models.SearchHistory || mongoose.model<ISearchHistory>('SearchHistory', SearchHistorySchema);

export default SearchHistory;
