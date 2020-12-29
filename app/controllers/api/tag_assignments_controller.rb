# frozen_string_literal: true

class Api::TagAssignmentsController < ApplicationController
  def index
    result = TagAssignment.all
    render json: { tagAssignments: result }, status: :ok
  end

  def show
    result = TagAssignment.find(params[:id])
    render json: { tagAssignment: result }, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    render json: { message: e.message }, status: :bad_request
  end

  def create
    sentence = Sentence.find!(params[:sentence_id])
    tag = Tag.find!(params[:tag_id])
    result = TagAssignment.create!(sentence_id: sentence, tag_id: tag)
    render json: { tagAssignment: result }, status: :created
  rescue ActiveRecord::RecordNotFound => e
    render json: { message: e.message }, status: :bad_request
  end

  def update
    tag_assignment = TagAssignment.find(params[:id])
    sentence = Sentence.find!(params[:sentence_id])
    tag = Tag.find!(params[:tag_id])
    tag_assignment&.update!(sentence_id: sentence, tag_id: tag)
    render json: { tagAssignment: tag_assignment }, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    render json: { message: e.message }, status: :bad_request
  end
end
