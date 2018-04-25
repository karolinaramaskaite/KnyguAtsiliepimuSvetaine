package com.project.intranet.domain;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Book {
    private int id;
    private int authorId;
    private byte[] image;
    private String title;
    private String about;
    private String year;
    private Date createdOn;
    private String isbn;

    public Book() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn() {
        Date date = new Date();
        this.createdOn = date;
    }
}
