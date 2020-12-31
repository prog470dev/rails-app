# frozen_string_literal: true

class Api::ReportsController < ApplicationController
  def tag_summary
    summary = Tag.all.joins(:tag_assignments).group(:name).count
    render json: { summary: summary }, status: :ok
  end
end
