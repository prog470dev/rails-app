# frozen_string_literal: true

class Api::SentencesController < ApplicationController
  def index
    sentences = Sentence.all
    # タグによる絞り込み
    if params[:tags]
      tags = params[:tags].split(' ').map(&:to_i)
      unless tags.empty?
        sentences =
          sentences.joins(:tag_assignments).where(
            tag_assignments: { tag_id: tags }
          )
            .distinct(:id)
      end
    end

    render json: {
             sentences:
               sentences.map { |sentence|
                 {
                   id: sentence.id,
                   content: sentence.content,
                   tags: sentence.tags
                 }
               }
           },
           status: :ok
  end

  def show
    sentence = Sentence.find(params[:id])
    render json: {
             sentence: {
               id: sentence.id, content: sentence.content, tags: sentence.tags
             }
           },
           status: :ok
  rescue ActiveRecord::RecordNotFound => e
    render json: { message: e.message }, status: :bad_request
  end

  def create
    sentence = Sentence.create!(content: params[:content])
    # タグの関連付けを更新
    params[:tags].each do |id|
      tag = Tag.find(id)
      TagAssignment.create!(sentence: sentence, tag: tag)
    end
    render json: { sentence: sentence }, status: :created
  end

  def update
    sentence = Sentence.find(params[:id])
    sentence&.update!(content: params[:content])
    # タグの関連付けを更新
    sentence.tag_assignments.delete_all
    params[:tags].each do |id|
      tag = Tag.find(id)
      TagAssignment.create!(sentence: sentence, tag: tag)
    end
    render json: { sentence: sentence }, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    render json: { message: e.message }, status: :bad_request
  end
end
