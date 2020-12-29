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
    result = Tag.create!(name: params[:name])
    render json: { tag: result }, status: :created
  end

  def update
    tag = Tag.find(params[:id])
    parent = TagAssignment.find(params[:parent_id]) if params[:parent_id]
    tag&.update!(name: params[:name], parent: parent)
    render json: { tag: tag }, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    render json: { message: e.message }, status: :bad_request
  end
end
