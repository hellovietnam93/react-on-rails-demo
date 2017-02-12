class PostsController < ApplicationController
  before_action :find_post, except: [:index, :new, :create]

  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new post_params

    respond_to do |format|
      if @post.save
        format.html {redirect_to @post, notice: "Post was successfully created."}
        format.json {render :show, status: :created, location: @post}
      else
        format.html {render :new }
        format.json {render json: @post.errors, status: :unprocessable_entity}
      end
    end
  end

  def show

  end

  def edit

  end

  def update
    respond_to do |format|
      if @post.update_attributes post_params
        format.html {redirect_to @post, notice: "Post was successfully updated."}
        format.json {render :show, status: :created, location: @post}
      else
        format.html {render :new }
        format.json {render json: @post.errors, status: :unprocessable_entity}
      end
    end
  end

  def destroy
    @post.destroy
    respond_to do |format|
      format.html {redirect_to root_path, notice: "Post was successfully destroyed."}
      format.json {head :no_content }
    end
  end

  private
  def find_post
    @post = Post.find_by params[:id]
    unless @post
      flash[:alert] = "Not found!"
      redirect_to root_path
    end
  end

  def post_params
    params.permit(:post).require :name
  end
end
