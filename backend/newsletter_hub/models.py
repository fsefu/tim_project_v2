from django.db import models


class NewsLetterData(models.Model):
    title = models.CharField(max_length=255)
    file_name = models.FileField(upload_to="newsletters/pdfs/")
    date = models.DateField()
    isGenerated = models.BooleanField(default=False)  # New field

    def __str__(self):
        return self.title

    def mark_as_generated(self):
        if self.extractedtext_set.exists() and self.extractedimage_set.exists():
            self.isGenerated = True
            self.save()


class ExtractedText(models.Model):
    file_id = models.ForeignKey(NewsLetterData, on_delete=models.CASCADE)
    page_number = models.IntegerField()
    text_file_name = models.CharField(max_length=255)

    def __str__(self):
        return f"Text for {self.file_id.title} - Page {self.page_number}"


class ExtractedImage(models.Model):
    file_id = models.ForeignKey(NewsLetterData, on_delete=models.CASCADE)
    page_number = models.IntegerField()
    image_file_name = models.CharField(max_length=255)

    def __str__(self):
        return f"Image for {self.file_id.title} - Page {self.page_number}"


class NewsLetter(models.Model):
    text_id = models.ForeignKey(ExtractedText, on_delete=models.CASCADE)
    news_letter_content = models.TextField()

    def __str__(self):
        return self.news_letter_title


class Article(models.Model):
    news_letter_id = models.ForeignKey(NewsLetter, on_delete=models.CASCADE)
    article_title = models.CharField(max_length=255)
    article_content = models.TextField()
    article_img = models.ImageField(upload_to="articles/", null=True, blank=True)
