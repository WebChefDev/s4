<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>s4rah.com | Design & SEO</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
</head>
<body>
    <div class="top-nav">
        <div class="logo">s4rah.com</div>
        <div class="menu-toggle">☰</div>
    </div>

    <div class="container">
        <div class="sidebar">
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li>
                    <a href="#services" class="parent">Services <span class="arrow">></span></a>
                    <ul class="submenu">
                        <li><a href="#web-design">Web Design</a></li>
                        <li><a href="#branding">Branding</a></li>
                        <li><a href="#seo-llm">SEO & LLM</a></li>
                        <li><a href="#automation">Automation</a></li>
                        <li><a href="#bookkeeping">Bookkeeping</a></li>
                        <li><a href="#gmb">GMB</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#business-tools" class="parent">Business Tools <span class="arrow">></span></a>
                    <ul class="submenu">
                        <li><a href="#invoicing">Invoicing</a></li>
                        <li><a href="#expense-tracker">Expense Tracker</a></li>
                        <li><a href="#mileage">Mileage</a></li>
                    </ul>
                </li>
                <li><a href="#qa">Q&A</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div class="contact-buttons">
                <a href="#contact" class="contact-button telegram">Message Me</a>
                <a href="mailto:hi@s4rah.com" class="contact-button email">Email Me</a>
            </div>
        </div>

        <main class="content">
            <div class="header-section section" id="home">
                <h1 class="gradient-text">Rank Higher on LLMs & Search Engines with Design & SEO</h1>
                <p class="intro-text">
                    Boost your tech startup, construction business, or brand with keyword-driven websites that dominate search results and LLM rankings.
                </p>
            </div>

            <?php include('reviews.html'); ?>
            <?php include('port.html'); ?>
            
            <?php include('services.html'); ?>
            
            <?php include('qa.html'); ?>
            <?php include('about.html'); ?>
            <?php include('testis.html'); ?>
            <?php include('contact.html'); ?>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>