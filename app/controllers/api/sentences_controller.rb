# frozen_string_literal: true

class Api::SentencesController < ApplicationController
  def index
    result = Sentence.all
    render json: { sentences: result }, status: :ok
  end

  def show
    result = Sentence.find(params[:id])
    render json: { sentence: result }, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    render json: { message: e.message }, status: :bad_request
  end

  def create
    result = Sentence.create!(content: params[:content])
    render json: { sentence: result }, status: :created
  end

  def update
    sentence = Sentence.find(params[:id])
    sentence&.update!(content: params[:content])
    render json: { sentence: sentence }, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    render json: { message: e.message }, status: :bad_request
  end
end
