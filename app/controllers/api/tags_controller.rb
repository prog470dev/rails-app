# frozen_string_literal: true

class Api::TagsController < ApplicationController
  def index
    result = Tag.all
    render json: { tags: result }, status: :ok
  end

  def show
    result = Tag.find(params[:id])
    render json: { tag: result }, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    render json: { message: e.message }, status: :bad_request
  end

  def create
    parent = Tag.find(params[:parent_id]) if params[:parent_id]
    result = Tag.create!(name: params[:name], parent_id: parent&.id)
    render json: { tag: result }, status: :created
  rescue ActiveRecord::RecordNotFound => e
    render json: { message: e.message }, status: :bad_request
  end

  def update
    tag = Tag.find(params[:id])
    parent = Tag.find(params[:parent_id]) if params[:parent_id]
    tag&.update!(name: params[:name], parent_id: parent&.id)
    render json: { tag: tag }, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    render json: { message: e.message }, status: :bad_request
  end

  def delete_unused
    Resque.enqueue(DeleteUnusedTagsJob)
    render json: {}, status: :ok
  end
end
